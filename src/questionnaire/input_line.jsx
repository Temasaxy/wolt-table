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
    const status = []
    const names = []
    const exel_names = []
    const final = []
    let chek = [final, exel_names]
    const change2 = event => {
        setInpexel(event.target.value)
    }
    const cahnge = event => {
        setInputone(event.target.value)
    }
    const subexelonclick = () => {
        let f_n = []
        let n = []
        inpexel.forEach((el, ind) => {
            if(ind % 2 === 0){
                f_n.push(el)}
            if(ind % 2 != 0){
                n.push(el)}
        })
        console.log(f_n, n)
        setSubexel(exel_names)
    }
    const submittedValueclick = () => {
        inputOne.split("\t").forEach((el) => {
            if(["Заонборден", "Без статуса", "Отказ", "Отправлена"].includes(el)){ 
                status.push(el)
    
            }
            const __isAlphaNumeric = (el) => /^[A-ZА-ЯЁ\s]+$/i.test(el);
            if(__isAlphaNumeric(el) && !["Заонборден", "Без статуса", "Отказ", "Отправлена"].includes(el)){
                names.push(el)  
        
            }
        })
        status.forEach((el, ind) => {
            if(el === "Заонборден")
                final.push(names[ind])
                
        })
        setSubmittedValue(final);
        setInputone('');
    }
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
                            <a href="https://script.google.com/macros/s/AKfycbwRQ-MmOgzl5zrHc1mJJBD-1Kqqo5eU2HVPJHfP5mTz7hTC27p4Vd9GLZyQQSpeIXRD/exec" 
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
                                <button className="btn_get_chek">курьеры которых нет</button>
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
                </div>
            </SwiperSlide>
        </Swiper>
    );
};
export default Table_link;