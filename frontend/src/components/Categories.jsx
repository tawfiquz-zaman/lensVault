function Categories() {
  const categories = [
    "All",
    "Nature",
    "Travel",
    "Architecture",
    "Portraits",
    "Food",
    "Abstract",
    "Street",
  ];

  return (
    <section className="categories">
      {categories.map((item) => (
        <button key={item}>{item}</button>
      ))}
    </section>
  );
}

export default Categories;