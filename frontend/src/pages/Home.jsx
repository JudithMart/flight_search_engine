import Filter from "../components/Filter"
import Header from "../components/header"
import Card from "../components/Card"

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className=" p-20 flex gap-52">
        <Filter />
        <div className="flex flex-col justify-center items-center ">
          <Card />
          <Card />
        </div>
        

      </div>


    </div>
  )
}

export default Home
