import React, { useEffect, useState } from "react";
import DictionaryStyles from "./DicrionaryPageStyles";
import CardOfWord from "./components/CardForWord/CardForWord";
import API_URL from "../../Constants/constants";

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
  const url = `${API_URL}users/${user.id}/aggregatedWords?group=${section - 1}&page=0&filter=${filter}&wordsPerPage=20`;

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
      <div>
          <div className={useStyles.cards}>
              {
                  listOfCard && listOfCard.length !== 0
                    ? listOfCard.map((card:any) => <CardOfWord key={card.id} cardInfo={card} />)
                    : <div>No items yet.</div>
              }
          </div>
      </div>
  );
};

export default DifficultWords;
