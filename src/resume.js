import { library, dom } from "@fortawesome/fontawesome-svg-core";
import "./style/resume.scss";
import imageUrl from "./assets/maxdup-crop.png";

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

function localeChange() {
  let init = () => {
    this.targetLocaleId = LOCALIZED_TARGETS.indexOf("fr-CA");
    this.targetLocaleId = Math.max(0, this.targetLocaleId);
    this.baseLocale = LOCALIZED_TARGETS[this.targetLocaleId];
    this.targetLocale = LOCALIZED_TARGETS[this.targetLocaleId];
    this.applyLocale();
  };

  this.localizedElementsText = window.document.querySelectorAll(
    "[data-localize-text]",
  );
  this.localizedElementsAria = window.document.querySelectorAll(
    "[data-localize-aria]",
  );
  this.localizedElementsContent = window.document.querySelectorAll(
    "[data-localize-content]",
  );

  this.setTargetLocale = (locale) => {
    this.baseLocale = this.targetLocale;
    this.targetLocale = locale;
    this.applyLocale();
  };

  const getLocString = (hash, locale) => {
    return LOCALIZED_STRINGS[`${hash}:${locale}`] || "";
  };

  this.setElemText = (e) => {
    const hash = e.getAttribute("data-localize-text");
    e.innerHTML = getLocString(hash, this.targetLocale);
  };

  this.setElemAria = (e) => {
    const hash = e.getAttribute("data-localize-aria");
    e.setAttribute("aria-label", getLocString(hash, this.targetLocale));
  };

  this.setElemContent = (e) => {
    const hash = e.getAttribute("data-localize-content");
    e.setAttribute("content", getLocString(hash, this.targetLocale));
  };

  this.applyLocale = () => {
    this.localizedElementsText.forEach(this.setElemText);
  };

  init();
}

window.addEventListener("load", function () {
  const loc = new localeChange();
  const url = new URL(window.location.href);
  const lang = url.searchParams.get("lang") || "en";
  switch (lang) {
    case "fr":
      loc.setTargetLocale("fr-CA");
      break;
    case "en":
    default:
      loc.setTargetLocale("en-US");
      break;
  }
});
