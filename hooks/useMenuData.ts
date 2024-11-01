import {useCallback, useEffect, useState} from "react";
import {insertMenuData, fetchMenuData, initDatabase, getItemsByNameAndCategories, MenuItem} from "@/scripts/database"

interface MenuData {
    categorys: string[];
    menuData: MenuItem[];
    setSearchText: (text: string) => void;
    setCategorys: (categorys: string[]) => void;
}

export function useMenuData(): MenuData {
    const [menuData, setMenuData] = useState<MenuItem[]>([]);
    const [menuCategories, setMenuCategories] = useState<string[]>([]);
    const [searchName, setSearchName] = useState<string>("");
    const [searchCategorys, setSearchCategorys] = useState<string[]>([]);
    const [dbInitDone, setDbInitDOne] = useState<boolean>(false);


    useEffect(() => {
        const getData = async () => {
            try {
                let items = await getItemsByNameAndCategories(searchName, searchCategorys);
                if (items) {
                    setMenuData(items);
                }
            } catch (err) {
                console.log(err);
            }
        }
        if(dbInitDone){
            getData();
        }
    }, [dbInitDone, searchName, searchCategorys]);


    //Use effect to initialize the database and fetch the menu data
    useEffect(() => {
        const initSqLite = async () => {
            try {
                await initDatabase();
                let items = await getItemsByNameAndCategories("", []);
                if (!items || items.length === 0) {
                    await fetchMenuData();
                    items = await getItemsByNameAndCategories("", []);
                    if (items && items.length > 0) {
                        setMenuData(items);
                    }
                }
                //Set Categoryslist
                let catList = items.reduce((acc: string[], item) => {
                    if (item.category && !acc.includes(item.category)) {
                        acc.push(item.category);
                    }
                    return acc;
                },[]);
                setMenuCategories(catList);
                setDbInitDOne(true);
            } catch (err) {
                console.log(err);
            }
        }
        initSqLite();
    }, []);


    const setSearchText = useCallback((text: string) => {
        setSearchName(text);
    }, []);

    const setCategorys = useCallback((categorys: string[]) => {
        setSearchCategorys(categorys);
    }, []);

    return {menuData, setSearchText, setCategorys, categorys: menuCategories};
}
