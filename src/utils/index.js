import htmlParser from 'react-html-parser'

// 형식 체크
export const validation = {
    email: (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    },
    password: (password) => {
        // 한글을 제외한 글자가 8~15로 되어있다면 true
        const is = /[^ㄱ-ㅎ가-힣]{8,50}$/.test(password)
        
        if (!is) return false

        // 영문이 한글자 이상 있는지 판단
        return /[a-zA-Z]+/.test(password)
    }
}



// 무색인지 유색인지 판단 유색이면 true 무색이면 false
export const getColorConcentration = (rgba)  => {
    const [ r, g, b, a ] = rgba.split(',')

    if (Number(a) <= 0.5 ) return false
    if (Number(r) + Number(g) + Number(b) > 460) return false

    return true
}

// rand
export function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
  

export const cookies = {
    set: (props) => {
        const { value, maxAge=0, domain=`.${process.env.NEXT_PUBLIC_PURE_DOMAIN}` } = props
        document.cookie = `${value};path=/;max-age=${maxAge};domain=${domain}`
    },
    get: (name) => {
        let x, y
        const val = document.cookie.split(';');

        for (let i = 0; i < val.length; i++) {
            x = val[i].substr(0, val[i].indexOf('='))
            y = val[i].substr(val[i].indexOf('=') + 1)
            x = x.replace(/^\s+|\s+$/g, '')
            if (x === name) {
                return unescape(y)
            }
        }   
    },
    remove: (name) => {
        const expireDate = new Date();

        //어제 날짜를 쿠키 소멸 날짜로 설정한다.
        expireDate.setDate( expireDate.getDate() - 1 )
        document.cookie = `${name}=; expires=${expireDate.toGMTString()}; path=/`
    }
}


export const setLangCookie = (lang) => {
    cookies.set({ value: `NEXT_LOCALE=${lang}`, maxAge: 60 * 60 * 24 * 365 })
}

// number format
export const numberFormat = (x) => {
    if (!x) return 0
    
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function fileSize(bytes) {
    const sizes = ['Byte', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    const result = Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];

    return result === '1000 MB' ? '1 GB' : result
}

// intl html 적용
export function parseHtmlIntl(msg) {
    return htmlParser(msg.replace(/<%/g, '<').replace(/%>/g, '>'))
}

// 한국 시각과의 차이가 0~60인거면 true
export function isCanService() {
    return true
    /*
    const timearea = moment.tz.guess()
    
    const other = moment.tz("2014-10-01 12:00:00", timearea).utc()
    const korea = moment.tz("2014-10-01 12:00:00", "Asia/Seoul").utc()

    const diff = Math.abs(moment.duration(korea.diff(other)).asMinutes())
    
    return (diff >= 0 && diff <= 60)
    */
}

export function handleDisabledRightClick(e) {
    e.preventDefault()
}

export function getCapitalize(s) {
    return s.split(" ").map(v => v.charAt(0).toUpperCase() + v.substring(1).toLowerCase()).join(" ");
}