const fetchData = () => {
  const promis = new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve("done");
      } else {
        reject("Error List");
      }
    }, 1500);
  });

  return promis;
};

setTimeout(() => {
  console.log("Processing data:");
debugger
  fetchData()
    .then((data) => {
      console.log(data);

      return fetchData();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
}, 1000);
