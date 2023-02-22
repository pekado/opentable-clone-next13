import Header from "../components/Header"

function Loading() {
    return (
        <>
            <Header />
            <div className="flex animate-pulse py-4 m-auto w-2/3 justify-between items-start">
                <div className=" animate-pulse w-1/5 mr-12">
                    <div className="border-b pb-4 flex flex-col">
                        <h1 className="mb-2">Region</h1>
                        ...
                    </div>
                    <div className="border-b pb-4 mt-3 flex flex-col">
                        <h1 className="mb-2">Cuisine</h1>
                        ...
                    </div>
                    <div className="mt-3 pb-4">
                        <h1 className="mb-2">Price</h1>
                        <div className="flex text-center
                ">
                            ...
                        </div>
                    </div>
                </div>
                <div className="w-5/6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="animate-pulse bg-slate-200 w-64 h-72 rounded overflow-hidden border m-3 cursor-pointer">

                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Loading