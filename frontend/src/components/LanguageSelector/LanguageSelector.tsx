import classNames from "classnames";
import i18n from "../../i18n";
import "./index.scss";

export default function LanguageSelector() {
  return (
    <div className="language-selector">
      {Object.keys(i18n.services.resourceStore.data).map((language, index) =>
        <span
          key={index}
          className={classNames("language-selector__language", { "language-selector__language--selected": i18n.language === language })}
          onClick={() => i18n.changeLanguage(language)}>
          {language.toUpperCase()}
        </span>
      )}
    </div>
  )
}
