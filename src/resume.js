import "@fortawesome/fontawesome-free/css/all.min.css";
import "./style/resume.scss";
import imageUrl from "./assets/maxdup.png";

const img = document.createElement("img");
img.setAttribute("src", imageUrl);
img.setAttribute("id", "profile-photo");
document.querySelector("#header").appendChild(img);
