import Head from 'next/head'
import Header from '../components/Header'
import Image from "next/image"

export default function Home() {
  return (
    <div>
      <div className="flex justify-between max-w-6xl">
          {/* {Left} */}
          <div className="relative hidden lg:inline-grid h-24 w-24">
              <Image 
                src="https://drive.google.com/uc?export=view&id=19agDVj5miAdZlO0FmvjPqZNS7WpsKM3o"
                layout="fill"
                objectFit="contain"
              />
          </div>
          <div className="relative w-10 h-10 lg:hidden flex-shrink-0 cursor-pointer">
          <Image 
                src="https://drive.google.com/uc?export=view&id=15d__d2s7ohXNLFnPagYjRIcCh4euTFRa"
                layout="fill"
                objectFit="contain"
              />
          </div>
          {/* {Middle} */}
          
          {/* {Right} */}
      </div>

      {/* {Feed} */}

      {/* {Modal} */}
    </div>
  )
}
