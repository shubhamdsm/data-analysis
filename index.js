let assignmentId;
const getDataSet = () => {
  fetch(
    "https://one00x-data-analysis.onrender.com/assignment?email=shubhamdv19@gmail.com"
  )
    .then((response) => {
      if (response.ok) {
        // Handle success
        assignmentId = response.headers.get("x-assignment-id");
        console.log("assignmentId", assignmentId);
        return response.json();
        // Parse response as JSON
      } else {
        throw new Error("Get data failed");
        // Handle failure
      }
    })
    .then((data) => {
      handleMostFrequentWords(data);
      // Handle success
      // responseDiv.innerText = `Tweet posted successfully! Tweet ID: ${data.id}`;
    })
    .catch((error) => {
      console.log(error, "error");
      // Handle
    });
};
getDataSet();

const handleMostFrequentWords = (data) => {
  let flattenAllWords = data.join(" ");

  const words = flattenAllWords.split(" ").join(", ");

  const arrayOfStrings = words.split(",");
 

  const wordsFrequencyObject = {};

  for (let word of arrayOfStrings) {
    if (wordsFrequencyObject[word]) {
      wordsFrequencyObject[word] += 1;
    } else {
      wordsFrequencyObject[word] = 1;
    }
  }

  let mostFrequentWord = "";
  let highestFrequeny = 0;
  for (let word in wordsFrequencyObject) {
    if (wordsFrequencyObject[word] > highestFrequeny) {
      mostFrequentWord = word;
      highestFrequeny = wordsFrequencyObject[word];
    }
  }

  let trimmedString = mostFrequentWord.trim();



    if(trimmedString) {
      sendMostFrequentWord(trimmedString);

    }
};

const sendMostFrequentWord = (mostFrequentWord) => {
  
 

  fetch(
    "https://one00x-data-analysis.onrender.com/assignment?email=shubhamdv19@gmail.com",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ assignment_id:assignmentId, answer: mostFrequentWord }),
    }
  )
    .then((response) => {
      if (response.ok) {
        // Handle success
        return response.json();
        // Parse response as JSON
      } else {
        throw new Error("Send data failed");
        // Handle failure
      }
    })
    .then((data) => {
      console.log("data",data)
        
    })
    .catch((error) => {
      console.log(error, "error");
    });
};
