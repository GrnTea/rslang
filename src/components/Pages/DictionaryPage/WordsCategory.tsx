import React, { useEffect, useState } from "react";
import DictionaryStyles from "./DicrionaryPageStyles";
import CardOfWord from "./components/CardForWord/CardForWord";

type Props = {
    user: any,
    section: any,
    filter: string
}

interface ICategory {
  user: any,
  section: any,
  filter: string
}

const DifficultWords: React.FC<Props> = ({ user, section, filter }: ICategory) => {
  const useStyles = DictionaryStyles();
  const [listOfWords, setListOfWords] = useState([]);
  const url = `https://rslernwords.herokuapp.com/users/${user.id}/aggregatedWords?group=${section - 1}&page=0&filter=${filter}&wordsPerPage=20`;

  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(
        (response) => response.json(),
      )
      .then((jsonData) => {
        setListOfWords(jsonData);
      });
  }, [section, filter]);

  const listOfCard = listOfWords.length !== 0 ? listOfWords[0].paginatedResults : null;

  return (
    <div className={useStyles.cards}>
        {
            listOfCard && listOfCard.length !== 0
              ? listOfCard.map((card:any) => <CardOfWord key={card._id} cardInfo={card} isMain={false} />)
              : <div>No items yet.</div>
        }
    </div>
  );
};

export default DifficultWords;
