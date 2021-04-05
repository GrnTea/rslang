import React from "react";
import mainStyles from "./MainPageStyles";
import Games from "../Games/Games";

function MainPage() {
  const useStyles = mainStyles();
  return (
    <div className={useStyles.wrapper}>
      <div className={useStyles.container}>
        <div className={useStyles.description}>
          <h2>Выучи английский - начни прямо сейчас!</h2>
        </div>
        <div className={useStyles.description}>описание возможностей и преимуществ нашего супер-приложения
          с минималистичным дизайном в морских тонах.</div>

        <div className={useStyles.description}>
          <strong>Учебник</strong> - офигеть какой прекрасный!
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Commodi, veniam, voluptas! Animi dicta eaque eius error
          fugiat harum placeat unde veritatis voluptatem.
            Corporis dignissimos dolore eum hic obcaecati quam quo?</p>
          </div>
        <div className={useStyles.description}><strong>Словарь</strong> - индивидуальный подход! :)
          <p>Animi aperiam asperiores assumenda blanditiis consectetur dolore dolores ea est eveniet ipsum laborum modi
            molestias, necessitatibus nemo neque nobis nostrum odio pariatur, qui, quibusdam ratione reprehenderit rerum
            sapiente tenetur voluptas.</p>
          </div>
        <div className={useStyles.description}>Video</div>
        <div className={useStyles.description}>Adipisci cumque deleniti ducimus enim impedit nemo, officiis. A blanditiis consequuntur, delectus
            distinctio doloribus eaque est hic ipsa iusto labore mollitia necessitatibus omnis optio reiciendis veritatis!
            Cumque deleniti porro quisquam? Consectetur dicta explicabo hic id numquam reprehenderit saepe soluta suscipit tempore vel. Natus nisi,
            quis. Ab, eum hic incidunt ipsa itaque magnam, optio placeat quaerat quas quo, repellendus sequi vitae?
          Eveniet odio reprehenderit tempora tempore voluptas? Adipisci architecto at, beatae commodi dignissimos,
            ducimus fugit molestiae nulla odit pariatur placeat quae quod ratione, sequi tenetur totam ullam veritatis
            voluptatem. Delectus, possimus.
          </div>
        <div className={useStyles.description}>
        <Games/>
        </div>
      </div>
  </div>


  );
}

export default MainPage;
