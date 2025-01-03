import Image from "next/image";
import styles from "./LogoLoader.module.css";

const LogoLoader = () => {
  return (
    <div className="invert dark:invert-0">
      <Image
        src="/logo.png"
        className={styles.img}
        width="64"
        height="64"
        alt="logo_loader"
      />
    </div>
  );
};

export default LogoLoader;
