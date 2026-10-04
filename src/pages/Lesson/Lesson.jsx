import { useEffect, useRef, useState } from "react";
import "./Lesson.css";

import SpaceTeacher3D from "./components/SpaceTeacher3D";

import SpaceBackground from "../../shared/SpaceBackground/SpaceBackground";
import "../../shared/SpaceBackground/SpaceBackground.css";


/* =========================================================
   ALL ARRAYVERSE LESSONS
   ========================================================= */

const lessons = [
  {
    number: 1,
    title: "ARRAY BASICS",
    kicker: "FIRST LESSON",
    sector: "FOUNDATION SECTOR",
    description:
      "Understand what an array is, how elements are organized, and why arrays are one of the most important data structures in programming.",

    topics: [
      {
        number: "01",
        label: "WHAT IS AN ARRAY?",
        heading: "One Name.",
        highlight: " Many Values.",
        text:
          "An array is a collection of multiple values stored under a single variable name. Instead of creating separate variables for every value, an array allows related data to be organized together.",
        examples: [
          {
            label: "WITHOUT ARRAY",
            code: (
              <>
                int mark1 = 85;
                <br />
                int mark2 = 72;
                <br />
                int mark3 = 91;
              </>
            ),
          },
          {
            label: "WITH ARRAY",
            code: <>int marks[] = {"{"}85, 72, 91{"}"};</>,
          },
        ],
      },

      {
        number: "02",
        label: "ARRAY ELEMENTS",
        heading: "Meet the",
        highlight: " Elements.",
        text:
          "Every individual value stored inside an array is called an element. Each element occupies a position that can be identified using an index.",
        array: [85, 72, 91, 64, 78],
      },

      {
        number: "03",
        label: "WHY ARRAYS?",
        heading: "Organize Data",
        highlight: " Efficiently.",
        points: [
          "Store multiple related values",
          "Access elements using indexes",
          "Process values using loops",
          "Perform searching and sorting",
        ],
      },
    ],

    summary:
      "An array stores multiple related values under one name. Each value is called an element, and every element can be accessed through its index.",

    rule: "ARRAY = COLLECTION OF ELEMENTS",
  },


  {
    number: 2,
    title: "ARRAY CREATION",
    kicker: "SECOND LESSON",
    sector: "CREATION SECTOR",
    description:
      "Learn how arrays are declared, created, initialized, and prepared to store multiple values.",

    topics: [
      {
        number: "01",
        label: "DECLARATION",
        heading: "Define the",
        highlight: " Array.",
        text:
          "Array declaration tells the programming language what type of values the array will contain and gives the array a name.",
        examples: [
          {
            label: "JAVA DECLARATION",
            code: <>int marks[];</>,
          },
          {
            label: "ALTERNATIVE SYNTAX",
            code: <>int[] marks;</>,
          },
        ],
      },

      {
        number: "02",
        label: "CREATION",
        heading: "Reserve the",
        highlight: " Memory.",
        text:
          "After declaration, memory can be allocated for a specific number of elements. The size determines how many values the array can store.",
        examples: [
          {
            label: "CREATE ARRAY",
            code: <>marks = new int[5];</>,
          },
        ],
      },

      {
        number: "03",
        label: "INITIALIZATION",
        heading: "Fill the",
        highlight: " Elements.",
        text:
          "An array can be initialized with values when it is created.",
        examples: [
          {
            label: "INITIALIZED ARRAY",
            code: <>int marks[] = {"{"}85, 72, 91, 64, 78{"}"};</>,
          },
        ],
      },
    ],

    summary:
      "Array creation involves declaring the array, allocating its size, and initializing its elements with values.",

    rule: "DECLARE → CREATE → INITIALIZE",
  },


  {
    number: 3,
    title: "INDEX & POSITION",
    kicker: "THIRD LESSON",
    sector: "INDEX SECTOR",
    description:
      "Understand how indexes identify individual array elements and how positions are mapped to stored values.",

    topics: [
      {
        number: "01",
        label: "INDEX BASICS",
        heading: "Every Element Has an",
        highlight: " Address.",
        text:
          "An index identifies the position of an element inside an array. In most programming languages, array indexing begins from zero.",
        array: [10, 20, 30, 40, 50],
      },

      {
        number: "02",
        label: "ZERO BASED INDEXING",
        heading: "Start From",
        highlight: " Zero.",
        text:
          "The first element is stored at index 0, the second at index 1, and so on.",
        points: [
          "First element → index 0",
          "Second element → index 1",
          "Third element → index 2",
          "Last element → size - 1",
        ],
      },

      {
        number: "03",
        label: "ACCESSING VALUES",
        heading: "Find Any",
        highlight: " Element.",
        text:
          "An element can be accessed by placing its index inside square brackets.",
        examples: [
          {
            label: "ACCESS ELEMENT",
            code: <>marks[2]</>,
          },
          {
            label: "UPDATE ELEMENT",
            code: <>marks[2] = 95;</>,
          },
        ],
      },
    ],

    summary:
      "Indexes provide a direct way to identify and access individual elements stored inside an array.",

    rule: "FIRST INDEX = 0",
  },


  {
    number: 4,
    title: "MEMORY REPRESENTATION",
    kicker: "FOURTH LESSON",
    sector: "MEMORY SECTOR",
    description:
      "Explore how array elements are organized in memory and why arrays provide fast indexed access.",

    topics: [
      {
        number: "01",
        label: "CONTIGUOUS MEMORY",
        heading: "Elements Stay",
        highlight: " Together.",
        text:
          "Array elements are generally stored in consecutive memory locations. This organized layout allows the system to calculate where an element is located.",
        array: [25, 40, 65, 80, 95],
      },

      {
        number: "02",
        label: "ADDRESS MAPPING",
        heading: "Index Maps to",
        highlight: " Memory.",
        text:
          "The address of an element can be calculated from the starting address, element size, and index.",
        examples: [
          {
            label: "CONCEPT",
            code: <>Address = Base + (Index × Element Size)</>,
          },
        ],
      },

      {
        number: "03",
        label: "FAST ACCESS",
        heading: "Direct",
        highlight: " Access.",
        text:
          "Because the position can be calculated directly, accessing an array element by index is efficient.",
        points: [
          "Known starting location",
          "Known element size",
          "Index identifies position",
          "Direct element access",
        ],
      },
    ],

    summary:
      "Arrays organize elements in memory so that an element can be located efficiently using its index.",

    rule: "INDEX → POSITION → MEMORY",
  },


  {
    number: 5,
    title: "ARRAY TRAVERSAL",
    kicker: "FIFTH LESSON",
    sector: "TRAVERSAL SECTOR",
    description:
      "Learn how to visit every element of an array using loops and systematic traversal techniques.",

    topics: [
      {
        number: "01",
        label: "WHAT IS TRAVERSAL?",
        heading: "Visit Every",
        highlight: " Element.",
        text:
          "Traversal means visiting each element of an array one by one, usually with the help of a loop.",
        array: [12, 24, 36, 48, 60],
      },

      {
        number: "02",
        label: "FOR LOOP",
        heading: "Move Through",
        highlight: " The Array.",
        text:
          "A for loop can start from index zero and continue until the last valid index.",
        examples: [
          {
            label: "JAVA TRAVERSAL",
            code: (
              <>
                for(int i = 0; i &lt; marks.length; i++) {"{"}
                <br />
                &nbsp;&nbsp;System.out.println(marks[i]);
                <br />
                {"}"}
              </>
            ),
          },
        ],
      },

      {
        number: "03",
        label: "TRAVERSAL USES",
        heading: "Process Every",
        highlight: " Value.",
        text:
          "Traversal is useful for displaying, calculating, comparing, searching, and modifying array elements.",
        points: [
          "Display all values",
          "Calculate total",
          "Find maximum or minimum",
          "Search for a value",
        ],
      },
    ],

    summary:
      "Traversal visits array elements systematically, usually from the first index to the last index.",

    rule: "START → VISIT → MOVE → REPEAT",
  },


  {
    number: 6,
    title: "ARRAY INSERTION",
    kicker: "SIXTH LESSON",
    sector: "INSERTION SECTOR",
    description:
      "Understand how a new value can be inserted into an array position by shifting existing elements.",

    topics: [
      {
        number: "01",
        label: "INSERTION CONCEPT",
        heading: "Make Room for",
        highlight: " New Data.",
        text:
          "When inserting an element into the middle of an array, existing elements may need to be shifted toward the end.",
        array: [10, 20, 30, 40, 50],
      },

      {
        number: "02",
        label: "SHIFT ELEMENTS",
        heading: "Move Values",
        highlight: " Right.",
        text:
          "Elements from the insertion position toward the end are shifted one position to create an empty location.",
        points: [
          "Choose insertion position",
          "Start shifting from the end",
          "Move elements one position right",
          "Place the new value",
        ],
      },

      {
        number: "03",
        label: "INSERT VALUE",
        heading: "Place the",
        highlight: " New Element.",
        text:
          "After creating the required space, the new value can be placed at the selected position.",
        examples: [
          {
            label: "EXAMPLE",
            code: <>Insert 25 at index 2</>,
          },
        ],
      },
    ],

    summary:
      "Array insertion may require shifting existing elements to create space for a new value.",

    rule: "SHIFT → CREATE SPACE → INSERT",
  },


  {
    number: 7,
    title: "ARRAY DELETION",
    kicker: "SEVENTH LESSON",
    sector: "DELETION SECTOR",
    description:
      "Learn how deleting an element causes remaining elements to shift and fill the empty position.",

    topics: [
      {
        number: "01",
        label: "DELETE ELEMENT",
        heading: "Remove One",
        highlight: " Value.",
        text:
          "Deletion removes an element from a selected position. The empty position must then be handled by shifting later elements.",
        array: [15, 25, 35, 45, 55],
      },

      {
        number: "02",
        label: "SHIFT LEFT",
        heading: "Close the",
        highlight: " Gap.",
        text:
          "Elements after the deleted position are shifted one position toward the beginning of the array.",
        points: [
          "Select deletion position",
          "Remove the value",
          "Shift later elements left",
          "Reduce the logical size",
        ],
      },

      {
        number: "03",
        label: "RESULT",
        heading: "Array Becomes",
        highlight: " Compact.",
        text:
          "After shifting, the array no longer contains a gap between its active elements.",
        examples: [
          {
            label: "DELETE INDEX 2",
            code: <>[15, 25, 45, 55]</>,
          },
        ],
      },
    ],

    summary:
      "Array deletion removes a value and shifts later elements toward the beginning to fill the gap.",

    rule: "DELETE → SHIFT LEFT → CLOSE GAP",
  },


  {
    number: 8,
    title: "ARRAY UPDATION",
    kicker: "EIGHTH LESSON",
    sector: "UPDATE SECTOR",
    description:
      "Learn how an existing array element can be changed by accessing its index and assigning a new value.",

    topics: [
      {
        number: "01",
        label: "UPDATE CONCEPT",
        heading: "Replace an",
        highlight: " Existing Value.",
        text:
          "Updating an array means changing the value stored at an existing index.",
        array: [50, 60, 70, 80, 90],
      },

      {
        number: "02",
        label: "ACCESS INDEX",
        heading: "Locate the",
        highlight: " Element.",
        text:
          "The index identifies which element needs to be updated.",
        examples: [
          {
            label: "BEFORE",
            code: <>marks[2] = 70;</>,
          },
          {
            label: "AFTER",
            code: <>marks[2] = 95;</>,
          },
        ],
      },

      {
        number: "03",
        label: "DIRECT UPDATE",
        heading: "Change It",
        highlight: " Directly.",
        text:
          "Unlike insertion and deletion, updating an existing element does not require shifting other elements.",
        points: [
          "Find the index",
          "Access the element",
          "Assign a new value",
          "Other positions remain unchanged",
        ],
      },
    ],

    summary:
      "Array updation replaces the value at an existing index without changing the positions of other elements.",

    rule: "INDEX → ACCESS → REPLACE",
  },


  {
    number: 9,
    title: "ARRAY SEARCHING",
    kicker: "NINTH LESSON",
    sector: "SEARCH SECTOR",
    description:
      "Discover how searching algorithms locate a required value inside an array.",

    topics: [
      {
        number: "01",
        label: "SEARCHING",
        heading: "Find the",
        highlight: " Target.",
        text:
          "Searching means checking an array to determine whether a particular value exists and where it is located.",
        array: [18, 42, 67, 29, 84],
      },

      {
        number: "02",
        label: "LINEAR SEARCH",
        heading: "Check One by",
        highlight: " One.",
        text:
          "Linear search starts from the first element and compares each value with the target until the target is found or the array ends.",
        points: [
          "Start at index 0",
          "Compare with target",
          "Move to next index",
          "Stop when found",
        ],
      },

      {
        number: "03",
        label: "SEARCH RESULT",
        heading: "Target",
        highlight: " Located.",
        text:
          "The result of a search can be the index of the target or an indication that the value was not found.",
        examples: [
          {
            label: "EXAMPLE",
            code: <>Search 67 → Index 2</>,
          },
        ],
      },
    ],

    summary:
      "Searching checks array elements to locate a target value and determine its position.",

    rule: "COMPARE → MOVE → FIND",
  },


  {
    number: 10,
    title: "ARRAY SORTING",
    kicker: "TENTH LESSON",
    sector: "SORTING SECTOR",
    description:
      "Learn how array values can be arranged into ascending or descending order using sorting algorithms.",

    topics: [
      {
        number: "01",
        label: "SORTING",
        heading: "Bring Order to",
        highlight: " Data.",
        text:
          "Sorting rearranges array elements into a particular order, such as ascending or descending order.",
        array: [50, 20, 80, 10, 40],
      },

      {
        number: "02",
        label: "ASCENDING ORDER",
        heading: "Small to",
        highlight: " Large.",
        text:
          "Ascending order arranges values from the smallest value to the largest value.",
        examples: [
          {
            label: "BEFORE",
            code: <>[50, 20, 80, 10, 40]</>,
          },
          {
            label: "AFTER",
            code: <>[10, 20, 40, 50, 80]</>,
          },
        ],
      },

      {
        number: "03",
        label: "SORTING USES",
        heading: "Prepare Data for",
        highlight: " Processing.",
        text:
          "Sorted data can make searching, ranking, comparison, and data analysis easier.",
        points: [
          "Ascending order",
          "Descending order",
          "Bubble sort",
          "Selection sort",
        ],
      },
    ],

    summary:
      "Sorting rearranges array elements into a defined order so that data becomes easier to process.",

    rule: "UNORDERED → COMPARE → REARRANGE → ORDERED",
  },


  {
    number: 11,
    title: "2D ARRAYS",
    kicker: "ELEVENTH LESSON",
    sector: "MATRIX SECTOR",
    description:
      "Explore two-dimensional arrays and understand how data can be organized using rows and columns.",

    topics: [
      {
        number: "01",
        label: "WHAT IS A 2D ARRAY?",
        heading: "Rows Meet",
        highlight: " Columns.",
        text:
          "A two-dimensional array stores data in a grid-like structure using rows and columns.",
        examples: [
          {
            label: "JAVA",
            code: <>int matrix[][] = new int[3][3];</>,
          },
        ],
      },

      {
        number: "02",
        label: "MATRIX VIEW",
        heading: "Think in a",
        highlight: " Grid.",
        text:
          "Each value in a 2D array is identified using two indexes: one for the row and one for the column.",
        array: [1, 2, 3, 4, 5],
      },

      {
        number: "03",
        label: "2D ARRAY USES",
        heading: "Model Real",
        highlight: " Structures.",
        text:
          "Two-dimensional arrays are useful when data naturally has rows and columns.",
        points: [
          "Matrices",
          "Tables",
          "Game boards",
          "Grid based data",
        ],
      },
    ],

    summary:
      "A 2D array organizes data using rows and columns and requires two indexes to access an element.",

    rule: "ROW + COLUMN = 2D POSITION",
  },


  {
    number: 12,
    title: "ARRAY APPLICATIONS",
    kicker: "FINAL LESSON",
    sector: "MASTER SECTOR",
    description:
      "Bring everything together and understand how arrays are used in real programming applications.",

    topics: [
      {
        number: "01",
        label: "REAL WORLD USE",
        heading: "Arrays Are",
        highlight: " Everywhere.",
        text:
          "Arrays are used to organize collections of related data in many types of software and algorithms.",
        points: [
          "Student marks",
          "Product prices",
          "Sensor readings",
          "Game scores",
        ],
      },

      {
        number: "02",
        label: "ALGORITHM FOUNDATION",
        heading: "Build with",
        highlight: " Arrays.",
        text:
          "Searching, sorting, traversal, and many other algorithms use arrays as a fundamental data structure.",
        array: [8, 3, 7, 1, 9],
      },

      {
        number: "03",
        label: "ARRAYVERSE MASTER",
        heading: "You Have",
        highlight: " Completed the Journey.",
        text:
          "You have explored the fundamental concepts of arrays. The next step is to apply everything inside the Arrayverse Playground and Challenges.",
        points: [
          "Understand arrays",
          "Manipulate elements",
          "Search and sort",
          "Work with 2D arrays",
        ],
      },
    ],

    summary:
      "Arrays are fundamental data structures used to store, access, process, search, sort, and organize collections of data.",

    rule: "LEARN → PRACTICE → EXPLORE → MASTER",
  },
];


/* =========================================================
   LESSON PAGE
   ========================================================= */

function Lesson() {

  const completeSectionRef = useRef(null);

  const [teacherStopped, setTeacherStopped] = useState(false);

  /* -----------------------------------------
     FIND CURRENT LESSON FROM URL
  ----------------------------------------- */

  const pathParts = window.location.pathname.split("/");
  const lessonNumber = Number(pathParts[pathParts.length - 1]) || 1;

  const currentLesson =
    lessons.find((lesson) => lesson.number === lessonNumber) ||
    lessons[0];


  /* -----------------------------------------
     SCROLL / TEACHER STOP
  ----------------------------------------- */

  useEffect(() => {

    const handleScroll = () => {

      const completeSection = completeSectionRef.current;

      if (!completeSection) return;

      const rect = completeSection.getBoundingClientRect();

      if (rect.top <= window.innerHeight - 235) {
        setTeacherStopped(true);
      } else {
        setTeacherStopped(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);


  /* -----------------------------------------
     COMPLETION
  ----------------------------------------- */

  const completeLesson = () => {
  localStorage.setItem(
    `lesson${currentLesson.number}Completed`,
    "true"
  );

  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

  window.location.href = `${basePath}/learn`;
};


  /* -----------------------------------------
     COMPLETION STATUS
  ----------------------------------------- */

  const isCompleted =
    localStorage.getItem(
      `lesson${currentLesson.number}Completed`
    ) === "true";


  const nextLesson =
    lessons.find(
      (lesson) =>
        lesson.number === currentLesson.number + 1
    );


  /* -----------------------------------------
     RENDER
  ----------------------------------------- */

  return (
    <>
      <SpaceBackground />

      <main className="lesson-page">

        {/* =====================================
            TOP BAR
        ===================================== */}

        <div className="lesson-topbar">

          <span>
            ARRAYVERSE // LESSON{" "}
            {String(currentLesson.number).padStart(2, "0")}
          </span>

          <span>
            {currentLesson.sector}
          </span>

        </div>


        {/* =====================================
            HERO
        ===================================== */}

        <section className="lesson-hero">

          <div className="lesson-number">

            {String(currentLesson.number).padStart(2, "0")}

          </div>

          <div>

            <span className="lesson-kicker">
              {currentLesson.kicker}
            </span>

            <h1>
              {currentLesson.title.split(" ")[0]}

              <strong>
                {" "}
                {currentLesson.title
                  .split(" ")
                  .slice(1)
                  .join(" ")}
              </strong>
            </h1>

            <p>
              {currentLesson.description}
            </p>

          </div>

        </section>


        {/* =====================================
            3D ARRAYVERSE TEACHER
        ===================================== */}

        <div
          className={
            teacherStopped
              ? "teacher-stopped"
              : "teacher-follow"
          }
        >
          <SpaceTeacher3D />
        </div>


        {/* =====================================
            LESSON TOPICS
        ===================================== */}

        <section className="lesson-content">

          {currentLesson.topics.map((topic) => (

            <article
              className="lesson-topic"
              key={topic.number}
            >

              <span>
                {topic.number} / {topic.label}
              </span>


              <h2>
                {topic.heading}

                <strong>
                  {topic.highlight}
                </strong>
              </h2>


              {topic.text && (
                <p>
                  {topic.text}
                </p>
              )}


              {/* EXAMPLES */}

              {topic.examples && (

                <div className="lesson-examples">

                  {topic.examples.map(
                    (example, index) => (

                      <div
                        className="example-box"
                        key={index}
                      >

                        <div className="example-label">
                          {example.label}
                        </div>

                        <code>
                          {example.code}
                        </code>

                      </div>

                    )
                  )}

                </div>

              )}


              {/* ARRAY VISUAL */}

              {topic.array && (

                <div className="lesson-array">

                  {topic.array.map(
                    (value, index) => (

                      <div
                        className="lesson-cell"
                        key={index}
                      >

                        <small>
                          INDEX {index}
                        </small>

                        <strong>
                          {value}
                        </strong>

                      </div>

                    )
                  )}

                </div>

              )}


              {/* POINTS */}

              {topic.points && (

                <div className="lesson-points">

                  {topic.points.map(
                    (point, index) => (

                      <div key={index}>

                        <strong>
                          {String(index + 1).padStart(2, "0")}
                        </strong>

                        <span>
                          {point}
                        </span>

                      </div>

                    )
                  )}

                </div>

              )}

            </article>

          ))}


          {/* =====================================
              SUMMARY
          ===================================== */}

          <article className="lesson-topic lesson-summary">

            <span>
              {String(currentLesson.topics.length + 1).padStart(2, "0")}
              {" / LESSON SUMMARY"}
            </span>

            <h2>
              What did you
              <strong> learn?</strong>
            </h2>

            <p>
              {currentLesson.summary}
            </p>

            <div className="lesson-rule">
              {currentLesson.rule}
            </div>

          </article>

        </section>


        {/* =====================================
            COMPLETE LESSON
        ===================================== */}

        <section
          ref={completeSectionRef}
          className="lesson-complete"
        >

          <div>

            <span>
              {isCompleted
                ? `LESSON ${String(currentLesson.number).padStart(2, "0")} COMPLETED`
                : `LESSON ${String(currentLesson.number).padStart(2, "0")} COMPLETE`}
            </span>


            <h2>

              {currentLesson.number < 12
                ? "READY FOR THE"
                : "ARRAYVERSE"}

              <strong>

                {currentLesson.number < 12
                  ? ` NEXT LESSON?`
                  : " MASTER"}

              </strong>

            </h2>


            <p>

              {currentLesson.number < 12
                ? `Complete this lesson to continue to ${
                    nextLesson?.title || "the next lesson"
                  }.`
                : "You have completed all 12 core Arrayverse lessons."}

            </p>

          </div>


          <button
            onClick={completeLesson}
            type="button"
          >
            COMPLETE LESSON →
          </button>

        </section>

      </main>
    </>
  );
}


export default Lesson;