import {getProviders,signIn} from "next-auth/react";
import Header from "../../components/Header";

function signin({providers}) {
    return (
        <>
        <Header/>


        <div className="flex flex-col justify-center items-center min-h-screen py-2 -mt-20 px-14 text-center">
          <img src="https://drive.google.com/uc?export=view&id=1CW1Pl1sqJA45aUKljICCPUXJhjwHNX-X" className="w-80"/>
          
        <div className="mt-20">
         {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button 
              className="p-3 bg-blue-500 rounded-lg text-white"
              onClick={() => signIn(provider.id,{callbackUrl:"/"})}>
                Sign in with {provider.name}
              </button>
            </div>
          ))}
         </div>
        </div>
        </>
      )
}
export async function getServerSideProps(){
    const providers= await getProviders();
    return {
        props: {
            providers
        }
    };
}
export default signin
