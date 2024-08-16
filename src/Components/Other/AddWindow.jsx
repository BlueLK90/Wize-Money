/* eslint-disable react/prop-types */
const AddWindow = ({ newItem, setNewItem, submitbtn, open, items }) => {
  const inputStyle =
    "col-span-2 border border-gray-300 bg-gray-50 rounded-md p-1";

  let New = newItem;
  let setNew = setNewItem;
  let handleSubmit = submitbtn;
  let add = open;
  let inputFields = items;

  return (
    <div className="absolute z-10 w-full min-h-[70dvh] border border-gray-200 bg-gray-50 rounded-md p-8 shadow-md">
      <form
        className="grid grid-cols-3 gap-2 items-center"
        onSubmit={(e) => handleSubmit(e, New)}
      >
        {/* category input */}
        {inputFields.includes("Category") && (
          <>
            <label htmlFor="category" className="text-gray-900">
              Category:
            </label>
            <input
              type="text"
              id="category"
              placeholder="--Choose a Category--"
              className={inputStyle}
              value={New.category}
              onChange={(e) =>
                setNew({
                  ...New,
                  category: e.target.value,
                })
              }
              required
            />
          </>
        )}

        {/* title input */}
        {inputFields.includes("Title") && (
          <>
            <label htmlFor="title" className="text-gray-900">
              Title:
            </label>
            <input
              type="text"
              id="title"
              className={inputStyle}
              value={New.name}
              onChange={(e) =>
                setNew({
                  ...New,
                  title: e.target.value,
                })
              }
              required
            />
          </>
        )}

        {/* price input */}
        {inputFields.includes("Price") && (
          <>
            <label htmlFor="price" className="text-gray-900">
              Price:
            </label>
            <input
              type="text"
              id="price"
              className={inputStyle}
              value={New.price}
              onChange={(e) =>
                setNew({
                  ...New,
                  price: e.target.value,
                })
              }
              required
            />
          </>
        )}

        {/* amount input */}
        {inputFields.includes("Amount") && (
          <>
            <label htmlFor="amount" className="text-gray-900">
              Amount:
            </label>
            <input
              type="number"
              id="amount"
              className={inputStyle}
              value={New.amount}
              onChange={(e) =>
                setNew({
                  ...New,
                  amount: e.target.value,
                })
              }
              required
            />
          </>
        )}

        {/* date input */}
        {inputFields.includes("Date") && (
          <>
            <label htmlFor="dateAdded" className="text-gray-900">
              Date:
            </label>
            <input
              type="date"
              id="dateAdded"
              className={inputStyle}
              value={New.dateAdded}
              onChange={(e) =>
                setNew({
                  ...New,
                  dateAdded: e.target.value,
                })
              }
            />
          </>
        )}

        {/* details input */}
        {inputFields.includes("Details") && (
          <>
            <label htmlFor="title" className="text-gray-900">
              Details:
            </label>
            <input
              type="text"
              id="details"
              className={inputStyle}
              value={New.details}
              onChange={(e) =>
                setNew({
                  ...New,
                  details: e.target.value,
                })
              }
            />
          </>
        )}
        {/* image input */}
        {inputFields.includes("Image") && (
          <>
            <label htmlFor="img" className="text-gray-900">
              Image:
            </label>
            <label className="block">
              <input
                type="file"
                id="img"
                className="block w-max text-gray-500
                py-1 px-0 rounded-lg border-0
                text-sm file:rounded-lg file:px-2.5 file:py-1.5 file:mr-1
                file:sm:mr-6 file:sm:px-4
                hover:bg-violet-100
              "
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const imgUrl = URL.createObjectURL(file);
                    setNew({
                      ...New,
                      img: imgUrl,
                    });
                  }
                }}
              />
            </label>
          </>
        )}
        <br />
        <div className="h-16 col-span-3"></div>
        <div className="col-span-3 h-10 flex justify-center gap-8">
          <button
            type="button"
            className="bg-blue-gray-900 text-sm w-32 rounded-full text-white font-semibold"
            onClick={() => add()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-pale text-sm w-32 rounded-full text-darkapricot font-semibold"
          >
            Done
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddWindow;
