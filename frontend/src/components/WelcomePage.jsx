import React from "react"

function WelcomePage() {

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 mt-20">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center mt-10 pb-10">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="px-26 py-17.5 text-center">
              <div className="mb-5.5 inline-flex items-center space-x-2">
                <img className="w-7 h-7" src="src/images/logo.svg" alt="logo" />
                <span className="text-black font-medium text-xl">Personal finances</span>
              </div>
              <p className="font-medium 2xl:px-20 mt-6">
                Manage your personal finances easily and efficiently.
              </p>
              <span className="mt-20 inline-block">
                <img className="w-[350px] h-[350px]" src="src/images/mobile-illustration.svg" alt="illustration" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage