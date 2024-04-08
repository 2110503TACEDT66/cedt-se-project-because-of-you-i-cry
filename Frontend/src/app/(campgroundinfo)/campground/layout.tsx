import NewTopMenu2 from "@/components/NewTopMenu/NewTopMenu2";

export default function BookingLayout({children} : {children : React.ReactNode}){
    return (
        <div>
            <NewTopMenu2/>
                {children}
        </div>
        
      );
}