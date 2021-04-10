import API_URL from "../../Constants/constants";

const URL = API_URL;

function WordUpdate(user: {id: string, token: string}, word: string, answer: boolean) {
  fetch(`${URL}users/${user.id}/words/${word}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${user.token}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  })
    .then(response => response.json())
    .then(data => {
      if(data.difficulty){
        const wordData = {
          "difficulty": "false",
        "optional": {
          "studying": "true",
          "deleted": "false",
        },
      } 
      testUpdate("PUT", wordData);
    })
    .catch(error => {
      const data = {
        "difficulty": "false",
        "optional": {
          "studying": "true",
          "deleted": "false",
        },
      };
      testUpdate("POST", data);
    });

  function testUpdate(method: any, data: any) {
    fetch(`${URL}users/${user.id}/words/${word}`, {
      method: method,
      headers: {
        "Authorization": `Bearer ${user.token}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log("запись", data)
      })
      .catch(error => {
        console.log("Error124", error);
      })
  }
}
export default WordUpdate;
