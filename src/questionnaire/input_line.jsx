import React, {useState} from "react";
import { Navigation } from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import './input_line.css';
import "swiper/css"
import "swiper/css/navigation"; 
const Table_link = () => {
    const[inputOne, setInputone] = useState('');
    const[submittedValue, setSubmittedValue] = useState([]);
    const[inpexel, setInpexel] = useState('');
    const[subexel, setSubexel] = useState([]);
    const[missingcour, setMisiingcour] = useState([]);
    const[duplicate, setDuplicate] = useState([])
    const change2 = event => {
        setInpexel(event.target.value)
    }
    const cahnge = event => {
        setInputone(event.target.value)
    }
    const subexelonclick = () => {
        const exel_names = inpexel.trim().split(/\s+/).reduce((acc, curr, i, arr) => {
            if (i % 2 === 0) {
                acc.push(`${curr} ${arr[i + 1]}`);
            }
            return acc;
        }, [])
        if(exel_names.length > 1){
            setSubexel(exel_names);
            setInpexel('');
        }    
    }
    const double = () => {
        if(subexel.length > 1){
            const d_name = subexel.filter((el_d, ind) => {
                return subexel.indexOf(el_d) !== ind
            })
            setDuplicate(d_name)
        }
        else
            setDuplicate(['вы не ввели данные'])
    }
    const submittedValueclick = () => {
        const status = [];
        const names = [];
        const final = [];
        inputOne.split("\t").forEach((el) => {
            if(["Заонборден", "Без статуса", "Отказ", "Отправлена"].includes(el)){ 
                status.push(el)
    
            };
            const __isAlphaNumeric = (el) => !/\d/.test(el);
            if(__isAlphaNumeric(el)
                && !el == '' 
                && !(["Заонборден", "Без статуса", "Отказ", "Отправлена"].includes(el))
            )
            {
                names.push(el)  
        
            };
        })
        status.forEach((el, ind) => {
            if(el == "Заонборден")
                final.push(names[ind]);
                
        })
        setSubmittedValue(final);
        setInputone('');
    }
    const chekclick = () => {
        console.log(subexel)
        if (submittedValue.length > 0 && subexel.length > 0) {
            const chek = submittedValue.filter((el_new) => {
                const normalizedNew = el_new.trim();
                return !subexel.some(s => s.trim() === normalizedNew);
            });
            setMisiingcour(chek);
        }
        else
            setMisiingcour(['вы не ввели данные']);
    };
    return(
        <Swiper
        modules={[Navigation]}
        navigation={{
            nextEl: ".slide1", 
            prevEl: ".slide2",
        }}
        slidesPerView={1}
        centeredSlides={true}
        >
            <SwiperSlide>
                <div className="scroll_tab">
                    <div className="scroll">
                        <button className="slide1">Результат</button>          
                    </div>
                    <div className="table_parent">
                        <div className="table">
                            <h1 className="first_headline">Поместите данные из сайта</h1>
                            <a href={import.meta.env.VITE_SECRET_URL}
                            target="_blank" 
                            className="pref_link" 
                            referrerPolicy="origin">
                            Wolt — Onboarding
                            </a>
                            <h2>вот сюда</h2>
                            <input 
                            onChange={cahnge}
                            value={inputOne}
                            className="data_entry_wolt" 
                            type="text"/>
                            <div className="btn_row">
                                <button className="btn_get_data" onClick={submittedValueclick}>курьеры Wolt-таблицы</button>
                                <h2>Данные с Exel сюда</h2>
                                <input type="text"
                                 className="data_entry_wolt2"
                                 value={inpexel}
                                 onChange={change2}  />
                                <button className="btn_get_exel" onClick={subexelonclick}>курьеры Exel-таблицы</button>
                                <button className="btn_get_chek" onClick={double}>увидеть дубликаты</button>
                                <button className="btn_get_chek" onClick={chekclick}>сравнить таблицы</button>
                            </div>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="present_data">
                    <button className="slide2">Оправка зявки</button>
                    <div className="line">
                    </div>
                    <h1>Информация с таблицы:</h1>
                    <div className="cour_table_result">
                        <h2 className="name_of_table_cout_count">Кол-во курьеров со статусом Заонборден</h2>
                        <p className="len_cout">{submittedValue.length}</p>
                    </div>
                    <div className="cour_table_result">
                        <h2 className="name_of_table_cout_count">Кол-во курьеров с Exel таблицы</h2>
                        <p className="len_cout">{subexel.length}</p>
                    </div>
                    <div className="cour_table_result2">
                        <h2 className="name_of_table_cout_count">Курьеры которых нет</h2>
                        <ul className="res">
                            {missingcour.map((name, index) => (
                                <li key={index}>{name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="cour_table_result3">
                        <h2 className="name_of_table_cout_count">Повторяющиеся курьеры в Exel</h2>
                        <ul className="res">
                            {duplicate.map((name, index) => (
                                <li key={index}>{name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};
export default Table_link;