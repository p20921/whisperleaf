import db, { dbSlave, sequelize, sequelizeSlave } from 'model'
import sha256 from 'sha256'

const userInfo = db['user_info']
const userPermit = db['user_permit']
const userAlarm = db['user_alarm']
const userAuth = db['user_auth']
const userResponse = db['user_response']
const surveyWorkspace = db['survey_workspace']

const userInfoSlave = dbSlave['user_info']

// 페이지 무작위 설정
export class Create {
    constructor() {

    }

    async listovey(props) {
        const { email, password } = props
        
        // user_info, user_permit, survey_workspace 데이터 저장
        const transaction = await sequelize.transaction()

        try {
            const result = await userInfo.create({
                email, 
                pwd: sha256(password)
            }, { transaction })

            const user_no = result.dataValues.user_no

            await this.children({ user_no, transaction })

            await transaction.commit()

            return true

        } catch(e) {
            await transaction.rollback()
            throw e
        }
    }

    // 구글로그인,회원가입 시도시 바로 로그인시키는 정책
    async google(props) {
        const { email, img_src } = props
        const that = this

        // 회원가입
        async function create() {
            // user_info, user_permit, survey_workspace 데이터 저장
            const transaction = await sequelize.transaction()

            try {
                const result = await userInfo.create({
                    email,
                    img_src,
                    auth: true, 
                    google: true
                }, { transaction })

                const user_no = result.dataValues.user_no

                await that.children({ user_no, transaction })

                await transaction.commit()

                return true

            } catch(e) {
                await transaction.rollback()
                throw e
            }
        }

        // 가입되어있을경우 바로 로그인
        async function update(user_no, status) {
            try {
                await userInfo.update({
                    auth: true, 
                    google: true,
                    status: status === 40 ? 10 : status // password 5회초과시 변하는 password 상태값을 정상으로 해준다. (나머지 비정상 값은 그냥 유지)
                }, { where: { user_no } })

                return true
            } catch(e) {              
                throw e
            }
        }
        
        try {
            // 가입된 계정인지 확인
            const { count: is, user_no, status } = await userInfoSlave.findOne({ 
                where: { email },  
                attributes: [ [sequelizeSlave.fn('count', '*'), 'count'], 'user_no', 'status' ]
            })

            if (is > 0) return await update(user_no, status)
            else return await create()
        } catch(e) {
            throw e
        }
        
    }

    async children(props) {
        const { user_no, transaction } = props

        await Promise.all([
            userAuth.create({ user_no, join_time: sequelize.fn('NOW') }, { transaction }),
            
            userPermit.create({ 
                user_no, 
                ldate: sequelize.literal('NOW() + INTERVAL 30 day'),
                limit_fileupload_size: 5,
                limit_fileupload_date: sequelize.literal('NOW() + INTERVAL 30 day') 
            }, { transaction }), // 이게 맞고
            userResponse.create({ user_no, total: 50, ldate: sequelize.literal('NOW() + INTERVAL 30 day')}, { transaction }),
            
            userAlarm.create({ user_no }, { transaction }),
            surveyWorkspace.create({ user_no, base: true }, { transaction })
        ])

        return true
    }
}