"use client";
import { Combobox } from "@/components/ui/combobox";
import { QuestionCard } from "@/components/ui/questioncard";
import { QuestionCarousel } from "@/components/ui/questioncarousel";
import { Progress } from "@/components/ui/progress"


export default function Home() {
  //Todo: Progress values needs call back info from carousel index

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-3" >title</div>
      <Progress value={33} />
      <QuestionCarousel/>
      
      <Combobox></Combobox>
      <QuestionCard/>
    </div>
    
  );
}
