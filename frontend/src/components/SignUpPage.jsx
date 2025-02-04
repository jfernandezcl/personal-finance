import logo from '../images/logo.svg'

function SignUpPage() {

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 mt-20">
      <div className="rounded-sm border border-stroke bg-white shadow-default">
        <div className="flex flex-wrap items-center mt-10 pb-10">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="px-26 py-17.5 text-center">
              <a className="mb-5.5 flex items-center justify-center gap-2">
                <img className="w-10 h-auto" src={logo} alt="logo" />
                <span className="text-lg font-semibold">Personal finances</span>
              </a>
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

export default SignUpPage