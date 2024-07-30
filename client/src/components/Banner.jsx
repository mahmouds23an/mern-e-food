export default function Banner() {
  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
      <div className="py-24 flex flex-col md:flex-row-reverse justify-between items-center gap-8">
        {/* Right side */}
        <div className="md:w-1/2">
          <img src="/images/home/banner.png" alt="" />
          <div className="flex flex-col md:flex-row items-center justify-around -mt-14 gap-4">
            <div>
              <div className="flex bg-white py-2 px-3 rounded-2xl items-center gap-3 shadow-md w-64">
                <img
                  src="/images/home/b-food1.png"
                  alt=""
                  className="rounded-2xl"
                />
                <div className="space-y-1">
                  <h5 className="font-medium mb-1">Spicy noodles</h5>
                  <div className="rating rating-sm">
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-yellow-500"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-yellow-500"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-yellow-500"
                      readOnly
                      checked
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-yellow-500"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-yellow-500"
                      readOnly
                    />
                  </div>
                  <p className="">$ 18.00</p>
                </div>
              </div>
            </div>
            <div>
              <div className="sm:flex hidden bg-white py-2 px-3 rounded-2xl items-center gap-3 shadow-md w-64">
                <img
                  src="/images/home/b-food1.png"
                  alt=""
                  className="rounded-2xl"
                />
                <div className="space-y-1">
                  <h5 className="font-medium mb-1">Spicy noodles</h5>
                  <div className="rating rating-sm">
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-yellow-500"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-yellow-500"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-yellow-500"
                      readOnly
                      checked
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-yellow-500"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-yellow-500"
                      readOnly
                    />
                  </div>
                  <p className="">$ 18.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Left side */}
        <div className="md:w-1/2 space-y-7 px-4">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
            Dive into delights of delectable
            <span className="text-teal-500"> food</span>
          </h2>
          <p className="text-xl text-gray-500">
            Where each plate weaves a story of culinary mastery and passionate
            craftsmanship
          </p>
          <button className="btn bg-teal-500 px-8 py-3 font-semibold text-white rounded-full">
            Order now
          </button>
        </div>
      </div>
    </div>
  );
}
