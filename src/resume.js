import { library, dom } from "@fortawesome/fontawesome-svg-core";
import "./style/resume.scss";
import imageUrl from "./assets/maxdup.png";

import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faLanguage,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

library.add(
  faLocationDot,
  faPhone,
  faEnvelope,
  faLanguage,
  faGlobe,
  faGithub,
  faLinkedin,
);

dom.i2svg();

const img = document.createElement("img");
img.setAttribute("src", imageUrl);

img.setAttribute("id", "profile-photo");
document.querySelector("#header").appendChild(img);
