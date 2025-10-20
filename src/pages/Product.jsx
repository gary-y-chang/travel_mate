import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      
      <section>
        <img
          src="img1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About WorldWide.</h2>
          <p>
            Traveling worldwide offers countless benefits that enrich both the mind and spirit. 
            It broadens your perspective by exposing you to diverse cultures, languages, and ways of life, 
            helping you understand and appreciate differences while finding common ground among people.
          </p>
          <p>
            Exploring new destinations provides opportunities to taste unique 
            cuisines, witness breathtaking natural landscapes, and learn history firsthand through 
            monuments and traditions.
          </p>
        </div>
      </section>
    </main>
  );
}
