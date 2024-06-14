/**
 * 로그인 encrpyt 발행
 */
import db, { dbSlave, sequelize, sequelizeSlave } from 'model'
import aes256 from 'aes256'
import sha256 from 'sha256'
import * as Config from 'config/login.json'
import { rand } from 'utils'

const config = Config.default

const userInfo = db['user_info']
const userTempass = db['user_tempass']

const userInfoSlave = dbSlave['user_info']
const userOtpSlave = dbSlave['user_otp']

export class PublishEncrypt {
    constructor() {
        this.user_no = ''
        this.config = config
    }

    async listovey(props) {
        const { email, password } = props

        // 이메일 비밀번호 체크
        const result = await userInfo.findOne({ 
            where: { email, pwd: password }
        })
    
        if (!result) return ''
        
        this.user_no = result.user_no

        // 임시 비밀번호 발행
        const temp = await this.createTempass()

        
        // aes256 암호화 (lsitovey + 이메일 + 비밀번호 + 임시비밀번호)
        return this.createEncryptListovey({ email, password, temp })
    }

    async google(props) {
        const { email } = props

        // 이메일 체크
        const result = await userInfo.findOne({ 
            where: { email }
        })
    
        if (!result) return ''
        
        this.user_no = result.user_no

        // 임시 비밀번호 발행
        const temp = await this.createTempass()

        
        // aes256 암호화 (google + 이메일 + 임시비밀번호)
        return this.createEncryptGoogle({ email, temp })
    }

    // 임시비밀번호 발행
    async createTempass() {
        // 임시 비밀번호 발행
        const temp = rand(12345, 65535)
        await userTempass.upsert({ user_no: this.user_no, temp })

        return temp
    }

    createEncryptListovey(props) {
        const { email, password, temp } = props
        const { secret } = this.config
        const plaintext = `listovey${secret}${email}${secret}${temp}${secret}${password}`

        return this.createEncrypt(plaintext)
    }

    createEncryptGoogle(props) {
        const { email, temp } = props
        const { secret } = this.config
        const plaintext = `google${secret}${email}${secret}${temp}`

        return this.createEncrypt(plaintext)
    }

    createEncrypt(plaintext) {
        const { key } = this.config
        return aes256.encrypt(key, plaintext)
    }
}

export class Check {
    constructor(props) {
        const { email } = props
        this.email = email
    }

    async getUserInfo() {
        const res = await userInfoSlave.findOne({
            include: [
                { 
                    model: userOtpSlave, 
                    required: false,
                    attributes: [ 'approve', 'used', 'secret' ]
                }
            ],
            raw: false,
            attributes: [ [sequelizeSlave.fn('count', '*'), 'count'], 'user_no', 'count_status_40', 'status', 'auth' ],
            where: { email: this.email }
        })

        return res.dataValues
    }

    async isAccount(pwd) {
        // 이메일 비밀번호 체크
		return await userInfoSlave.findOne({ 
			where: { email: this.email, pwd: sha256(pwd) },
			attributes: [ [sequelizeSlave.fn('count', '*'), 'count'] ]  
		})
    }
}

export class Update {
    constructor(props) {
        const { user_no } = props
        this.user_no = user_no
    }

    // 로그인 실패시 카운트 증가
    async countStatus40Failed(count) {
        // 비밀번호 입력 실패시 최대 5까지 카운트 집계해준다
        const newCount = (count + 1) > 5 ? 5 : (count + 1)

        if (newCount < 5) {
            await userInfo.update({ count_status_40: newCount }, { where: { user_no: this.user_no } })
        } else if (newCount === 5) {
            await userInfo.update({ status: 40, count_status_40: newCount }, { where: { user_no: this.user_no } })
        }

        return newCount
    }

    // 로그인 성공시 카운트 초기화
    async countStatus40Success() {
        await userInfo.update({ count_status_40: 0 }, { where: { user_no: this.user_no } })
        return true
    }
}