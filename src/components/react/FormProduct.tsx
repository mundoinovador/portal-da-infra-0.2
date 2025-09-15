function FormProduct() {
  return (
    <form className="flex flex-col w-full gap-4 items-center">
      <div className="input-form-container">
        <label htmlFor="search-product-input" className="label-form">
          Pesquise aqui
        </label>
        <input
          className="input-search"
          type="text"
          name="search-product-input"
          id="search-product-input"
        />
      </div>
    </form>
  );
}

export { FormProduct };
