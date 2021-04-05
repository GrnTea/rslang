const URL = "https://rslernwords.herokuapp.com/";

function WordUpdate(user, word) {
  // let words = [...props[0]]
  // console.log(user)
  // console.log(word)
  // console.log(`${URL}users/${user.id}/words/${word}`)

   fetch(`${URL}users/${user.id}/words/${word}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${user.token}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
    })
    // .then(response => response.status)
    .then(response => response.json())
    .then(data => {
      console.log("слово есть", data)
    })
    .catch(error => {
      console.log("слова нету", error);

      const data = {
        "difficulty": "true",
        "optional": {
          "deleted": "false",
        }
      }
      testUpdate("POST", data)
    })

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