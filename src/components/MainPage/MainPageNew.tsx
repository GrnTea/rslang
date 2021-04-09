import React, { useEffect, useState, useCallback } from "react";
import "./style.scss";
import bookImg from "../../assets/images/main/textbook.png";




const Main = () => {
  const [page, setPage] = useState(0);
  const scroll = useCallback((e) => {
    console.log(e);
    if (e.deltaY > 0) {
      setPage((p) => p + 1);
    } else {
      setPage((p) => p - 1);
    }
  }, []);
  useEffect(() => {
    console.log("main mount");
    return () => console.log("main unmount");
  }, []);
  useEffect(() => {
    window.addEventListener("wheel", scroll);
    return () => {
      window.addEventListener("wheel", scroll);
    };
  }, [scroll]);
  useEffect(() => {
    console.log(page);
  }, [page])
  return <div className="main">
    <div className="main__bg">
    </div>
    <div className="main__container" style={{ top: `${-100 * page}vh` }}>
      <div className="main__page" >
        <div className="main__hero">
          <div className="main__text">
            <h1>Do you speak <br></br><b>English?</b></h1>
            <div className="hero__buttons">
              <div className="main__button">Yeah, sure!</div>
              <div className="main__button">Что, простите?</div>
            </div>
          </div>
          <div className="main__video">
            <iframe src="https://www.youtube.com/embed/IUTRRedYWgw" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        </div>
      </div>

      <div className="main__page" >
        <div className="main__hero main__hero--reversed">
          <div className="main__text">
            <h1>Учебник</h1>
            <div className="main__paragraph"> Слова здесь сгруппированы по разделам в зависимости от уровня сложности</div>
          </div>
          <div className="main__video">
            <img src={bookImg} alt="" ></img>
          </div>
        </div>
      </div>

      <div className="main__page" >
        <div className="main__hero">
          <div className="main__text">
            <h1>Словарь</h1>
            <div className="main__paragraph">Заносите изучаемые слова в словарь. Помечайте сложные для вас слова, что потом повторить</div>
          </div>
          <div className="main__video">
            <img src={bookImg} alt="" ></img>
          </div>
        </div>
      </div>

      <div className="main__page" >
        <div className="main__hero main__hero--reversed">
          <div className="main__text">
            <h1>4 игры</h1>
            <div className="main__paragraph">Играйте в игры, чтобы сделать процесс запоминания слов легким и увлекательным</div>
          </div>
          <div className="main__video">
            <img src={bookImg} alt="" ></img>
          </div>
        </div>
      </div>

      <div className="main__page" >
        <div className="main__hero">
          <div className="main__text">
            <h1>Статистика</h1>
            <div className="main__paragraph"> Следите за своим прогрессом с помощью статистики</div>
          </div>
          <div className="main__video">
            <img src={bookImg} alt="" ></img>
          </div>
        </div>
      </div>

      <div className="main__page" >
        <div className="main__hero main__hero--reversed">
          <div className="main__text">
            <h1>Присоединятесь</h1>
            <div className="main__button">Зарегистрироваться</div>
            <div className="main__button">Попробовать</div>
          </div>
          <div className="main__video">
            <img src={bookImg} alt="" ></img>
          </div>
        </div>
      </div>
    </div>
  </div>


}

export default Main;
