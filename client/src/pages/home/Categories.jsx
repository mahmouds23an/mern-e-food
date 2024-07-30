const categoryItems = [
  {
    id: 1,
    title: "Main dish",
    des: "(86 dishes)",
    image: "/images/home/category/img1.png",
  },
  {
    id: 2,
    title: "Breakfast",
    des: "(12 breakfast)",
    image: "/images/home/category/img2.png",
  },
  {
    id: 3,
    title: "Desert",
    des: "(48 desert)",
    image: "/images/home/category/img3.png",
  },
  {
    id: 4,
    title: "Browse all",
    des: "(255 item)",
    image: "/images/home/category/img4.png",
  },
];

export default function Categories() {
  return (
    <div className="section-container py-16">
      <div className="text-center">
        <p className="subtitle">Customer favorites</p>
        <h2 className="title">Popular Categories</h2>
      </div>
      {/* categoryItems */}
      <div className="flex flex-col sm:flex-row gap-8 justify-around items-center mt-12">
        {categoryItems.map((item, i) => (
          <div
            key={i}
            className="shadow-lg rounded-md bg-white py-6 px-6 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 duration-300 transition-all"
          >
            <div className="flex w-full mx-auto items-center justify-center">
              <img
                src={item.image}
                alt=""
                className="bg-teal-500 p-5 rounded-full w-28 h-28"
              />
            </div>
            <div className="mt-5 space-y-1">
              <h5>{item.title}</h5>
              <p>{item.des}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
