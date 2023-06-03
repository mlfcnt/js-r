const HISTORY_SIZE = 20;
const DEFAULT_COLOR = "white";
const REFRESH_RATE_MS = 1000;
const MAX_FONT_SIZE = 6;

const randomNumber = () => Math.round(Math.random() * 10000);

const generateXRandomNumbers = (x = HISTORY_SIZE) => {
  let randomNumbers = [];
  for (let i = 0; i < HISTORY_SIZE; i++) {
    randomNumbers.push(randomNumber());
  }
  return randomNumbers;
};

const getColor = (number, parent) => {
  const hasNoParent = parent == undefined;
  const childIsInferior = number < parent;
  return hasNoParent ? "white" : childIsInferior ? "red" : "green";
};

const getPercentageDifference = (number, parent) => {
  const hasNoParent = parent == undefined;
  const difference = hasNoParent ? 0 : (number / parent) * 100 - 100;
  return Math.round(difference);
};

const attachListToDom = (list) => {
  list.forEach((number, idx) => {
    createAndAppendLi(
      number,
      getColor(number, list[idx - 1]),
      getPercentageDifference(number, list[idx - 1])
    );
  });
};

const generateTextContent = (text, difference) => {
  let formattedDifference = difference < 0 ? difference : `+${difference}`;
  return `${text} (${formattedDifference}%)`;
};

const getFontSize = (difference) => {
  if (difference < 0) {
    return "1.5rem";
  } else {
    return `2rem`;
  }
};

const createAndAppendLi = (text, color = DEFAULT_COLOR, difference = 0) => {
  const li = document.createElement("p");
  li.textContent = generateTextContent(text, difference);
  li.style.color = color;
  li.style.fontSize = getFontSize(difference);
  ul_node.appendChild(li);
  return li;
};

const moveNumbers = () => {
  const li_items = ul_node.children;
  const arr = Array.from(li_items);
  for (let i = 0; i < arr.length; i++) {
    const parent = li_items[i + 1];
    const hasParent = parent != undefined;
    if (hasParent) {
      arr[i].style.color = parent.style.color;
      arr[i].style.fontSize = parent.style.fontSize;
      arr[i].textContent = parent.textContent;
    } else {
      const newNumber = randomNumber();
      const parent = arr[i].textContent.split(" ")[0];
      arr[i].style.color = getColor(newNumber, parent);
      const difference = getPercentageDifference(newNumber, parent);
      arr[i].style.fontSize = getFontSize(difference);
      arr[i].textContent = generateTextContent(newNumber, difference);
    }
  }
};

const ul_node = document.querySelector(".list");

const list = generateXRandomNumbers();

attachListToDom(list);

setInterval(moveNumbers, REFRESH_RATE_MS);
