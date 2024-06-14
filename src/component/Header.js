import { useState, useEffect, useCallback, useMemo } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import HeaderBarComponent from 'component/HeaderBar'
import HeaderMobileComponent from 'component/HeaderMobile'
import HeaderMenusComponent from 'component/HeaderMenus'
import useHeadTag from 'hooks/useHeadTag'

const initCategoryMenu = { anchorEl: null, type: '' }

const Component = (props) => {
    const { title } = props

    const [ openMore, setOpenMore ] = useState(false) // 모바일에서 더보기
    const [ top, setTop ] = useState(false) // 스크룰 위치에 따라 appbar 설정
    const [ categoryMenu, setCategoryMenu ] = useState(initCategoryMenu) // 카테고리 클릭시 서브 카테고리

    const getHeadTag = useHeadTag()

    const handleClickCategory = useCallback((e, type) => {
        setCategoryMenu({ anchorEl: e.currentTarget, type })
    }, [])

    const handleCloseCategory = useCallback(() => {
        setCategoryMenu(initCategoryMenu)
    }, [])

    const handleOpenMore = useCallback(_open => {
        setOpenMore(_open)
    }, [])
    
    const handleScroll = useCallback(() => {
        if (window.scrollY > 240) setTop(true)
        else setTop(false)
    }, [])

    const handleRouterPush = useCallback(async(src) => {
        await setOpenMore(false)

        Router.push(src)
        handleCloseCategory()
    }, [handleCloseCategory])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        window.addEventListener('load', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('load', handleScroll)
        }
    })

    return (
        <>
        {
            useMemo(() => (
                <Head>
                    {getHeadTag({ title })}
                </Head>
            ), [getHeadTag, title])
        }
        {
            useMemo(() => (
                <>
                <HeaderBarComponent position="static" top={top} onClickCategory={handleClickCategory} onClickMore={handleOpenMore} onRouterPush={handleRouterPush}/>
                <HeaderBarComponent position="fixed"  top={top} onClickCategory={handleClickCategory} onClickMore={handleOpenMore} onRouterPush={handleRouterPush}/>
                </>
            ), [top, handleClickCategory, handleOpenMore, handleRouterPush])
        }
        {
            useMemo(() => (
                <HeaderMobileComponent openMore={openMore} onOpenMore={handleOpenMore} onRouterPush={handleRouterPush}/>
            ), [openMore, handleOpenMore, handleRouterPush])
        }
        {
            // 서브 카테고리 (현재 가격만 있다..)
            useMemo(() => (
                <HeaderMenusComponent categoryMenu={categoryMenu} onClose={handleCloseCategory} onRouterPush={handleRouterPush}/>
            ), [categoryMenu, handleCloseCategory, handleRouterPush])
        }
        
        </>
    )
}


export default Component
