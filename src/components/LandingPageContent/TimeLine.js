export default function TimeLine(){
  return(
    <section className=" flex-cols justify-center">
      <div className="w-full p-96  ">
        <p>Image START UP avec representation du start ip</p>
         </div>

      <div>
        {/* <h2 className="font-bold"   >HISTORY</h2> */}
      <ol class="relative border-l border-gray-200 dark:border-gray-700 m-20">                  
    <li class="mb-10 ml-4">
        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">February 2021</time>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">MedTech  </h3>
        <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.</p>
       
    </li>
    <li class="mb-10 ml-4">
        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">March 2022</time>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">MeDdoc </h3>
        <p class="text-base font-normal text-gray-500 dark:text-gray-400">All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project.</p>
    </li>
    <li class="ml-4">
        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">September 2023</time>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">E-Learning on Hippocamp</h3>
        <p class="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements built on top of Tailwind CSS.</p>
    </li>
</ol>

      </div>
      <div className="w-1/2 mx-auto my-20 ">
      <video class="w-full h-auto border border-gray-200 rounded-lg dark:border-gray-700" controls>
      <source src="https://www.youtube.com/watch?v=krDWc30PAGg&pp=ygULdmlkZW8gdGVzdCA%3D" type="video/mp4"></source>
  Your browser does not support the video tag.
</video>
      </div>

    </section>



  )
}