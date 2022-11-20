
db.createUser({
  user: "service",
  pwd: "secret",
  roles: [
    {
      role: "readWrite",
      db: "classhire",
    } /*, 
                {
                    role: "root",
                    db: "classhire"
                }*/,
  ],
});

db = new Mongo().getDB("classhire");

db.createCollection("profiles", { capped: false });
db.createCollection("users", { capped: false });
db.createCollection("clases", { capped: false });

db.profiles.insertOne({
  _id: ObjectId("demoteacher0"),
  firstName: "Joe",
  lastName: "Fateree",
  clases: [
    ObjectId("clase0000001"),
    ObjectId("clase0000002"),
    ObjectId("clase0000003"),
    ObjectId("clase0000004"),
    ObjectId("clase0000005"),
    ObjectId("clase0000006"),
  ],
  role: "teacher",
  titulo: "Ingeniero en Informatica",
  fecha_nacimiento: "14/01/1964",
  description: "Joe Fathree es un author ganador de diversos premios al merito educativo, incluyendo ser nombrado como uno de los mejores profesores del mundo en 2016",
  experiencias: [
    {
      nivel: "primaria",
      descr: "Profesor de primaria",
    },
  ],
  photo: "http://res.cloudinary.com/dvjdc3ssy/image/upload/v1668944647/jej6zfcgvfjqikxrdaxt.png"
});

db.users.insertOne({
  _id: ObjectId("demoteacher0"),
  profile: ObjectId("demoteacher0"),
  firstName: "Joe",
  lastName: "Fateree",
  email: "teacher@uade.edu.ar",
  password: "$2b$06$T8qZKC8v28SC2SfcVRWLgOgaEwwDy.DXlI2BbnOjpLTm9ApOE67Ru",
});

db.clases.insertMany([
  {
    _id: ObjectId("clase0000001"),

    title: "Ruby",
    materia: {
      value: "ruby",
    },
    description:
      "Ruby es un lenguaje de programación interpretado, reflexivo y orientado a objetos, \
		 creado por el programador japonés Yukihiro Matz Matsumoto, quien comenzó a trabajar en Ruby en 1993, \
		 y lo presentó públicamente en 1995. ",
    price: 10,
    duration: 4,
    nivel: {
      value: "seminario",
    },
    frecuencia: {
      value: "once",
    },
    tipo_clase: {
      value: "grupal",
    },
    tags: ["ruby", "ruby on rails", "poo"],

    teacher_profile_id: ObjectId("demoteacher0"),
    comments: [],
    rating: 4,
    reviewCount: 5,
  },
  {
    _id: ObjectId("clase0000002"),

    title: "Java",
    materia: {
      value: "java",
    },
    description:
      "Programacion orientada a Objectos en Java. \
		Java es un lenguaje de programación y una plataforma informática que fue comercializada por primera vez \
		en 1995 por Sun Microsystems.​​.",
    price: 5,
    duration: 5,
    nivel: {
      value: "universitario",
    },
    frecuencia: {
      value: "diaria",
    },
    tipo_clase: {
      value: "grupal",
    },
    tags: ["programacion", "java", "poo"],

    teacher_profile_id: ObjectId("demoteacher0"),
    comments: [],
    rating: 2,
    reviewCount: 5,
  },
  {
    _id: ObjectId("clase0000003"),

    title: "Golang",
    materia: {
      value: "golang",
    },
    description:
      "Go es un lenguaje de programación concurrente y compilado con tipado estático inspirado \
		en la sintaxis de C, pero con seguridad de memoria y recolección de basura. Ha sido desarrollado por Google9​  \
		y sus diseñadores iniciales fueron Robert Griesemer, Rob Pike y Ken Thompson.10​ Actualmente está disponible en \
		formato binario para los sistemas operativos Windows, GNU/Linux, FreeBSD y Mac OS X, pudiendo también ser instalado\
		en estos y en otros sistemas mediante el código fuente.11​12​ Go es un lenguaje de programación compilado, \
		concurrente, imperativo, estructurado y orientado a objetos que de momento está disponible para diferentes tipos de\
		sistemas Unix-like, incluidos Linux, FreeBSD, Mac OS X y Plan 9 (puesto que parte del compilador está basado en un \
		trabajo previo sobre el sistema operativo Inferno). Las arquitecturas soportadas son i386, amd64 y ARM. ",
    price: 5,
    duration: 5,
    nivel: {
      value: "secundario",
    },
    frecuencia: {
      value: "semanal",
    },
    tipo_clase: {
      value: "individual",
    },
    tags: ["programacion", "java", "poo"],

    teacher_profile_id: ObjectId("demoteacher0"),
    comments: [],
    rating: 5,
    reviewCount: 5,
  },
  {
    _id: ObjectId("clase0000004"),

    title: "C++",
    materia: {
      value: "cplusplus",
    },
    description:
      "Programacion orientada a Objectos en Java. \
		Java es un lenguaje de programación y una plataforma informática que fue comercializada por primera vez \
		en 1995 por Sun Microsystems.​​.",
    price: 5,
    duration: 5,
    nivel: {
      value: "universitario",
    },
    frecuencia: {
      value: "once",
    },
    tipo_clase: {
      value: "consulta",
    },
    tags: ["programacion", "java", "poo"],

    teacher_profile_id: ObjectId("demoteacher0"),
    comments: [],
    rating: 5,
    reviewCount: 5,
  },
  {
    _id: ObjectId("clase0000005"),

    title: "Python",
    materia: {
      value: "python",
    },
    description:
      "Programacion orientada a Objectos en Java. \
		Java es un lenguaje de programación y una plataforma informática que fue comercializada por primera vez \
		en 1995 por Sun Microsystems.​​.",
    price: 5,
    duration: 5,
    nivel: {
      value: "secundaria",
    },
    frecuencia: {
      value: "diaria",
    },
    tipo_clase: {
      value: "individual",
    },
    tags: ["programacion", "java", "poo"],

    teacher_profile_id: ObjectId("demoteacher0"),
    comments: [],
    rating: 5,
    reviewCount: 5,
  },
  {
    _id: ObjectId("clase0000006"),

    title: "JavaScript",
    materia: {
      value: "javascript",
    },
    description:
      "Programacion orientada a Objectos en Java. \
		Java es un lenguaje de programación y una plataforma informática que fue comercializada por primera vez \
		en 1995 por Sun Microsystems.​​.",
    price: 5,
    duration: 5,
    nivel: {
      value: "primaria",
    },
    frecuencia: {
      value: "diaria",
    },
    tipo_clase: {
      value: "grupal",
    },
    tags: ["programacion", "java", "poo"],

    teacher_profile_id: ObjectId("demoteacher0"),
    comments: [],
    rating: 4,
    reviewCount: 5,
  },
  {
    _id: ObjectId("clase0000007"),

    title: "Ruby On Rails",
    materia: {
      value: "javascript",
    },
    description: "Ruby",
    price: 2,
    duration: 1,
    nivel: {
      value: "universitario",
    },
    frecuencia: {
      value: "semanal",
    },
    tipo_clase: {
      value: "grupal",
    },
    tags: ["programacion", "ruby", "poo"],

    teacher_profile_id: ObjectId("demoteacher0"),
    comments: [],
    rating: 3,
    reviewCount: 5,
  },
  {
    _id: ObjectId("clase0000008"),

    title: "JavaScript",
    materia: {
      value: "javascript",
    },
    description:
      "C++ es un lenguaje de programación diseñado en 1979 por Bjarne Stroustrup. \
		La intención de su creación fue extender al lenguaje de programación C y añadir mecanismos que permiten la 		 manipulación de objetos. En ese sentido, desde el punto de vista de los lenguajes orientados a objetos, C++ es un  lenguaje híbrido. ",
    price: 15,
    duration: 68,
    nivel: {
      value: "universitario",
    },
    frecuencia: {
      value: "semanal",
    },
    tipo_clase: {
      value: "individual",
    },
    tags: ["programacion", "java", "poo"],

    teacher_profile_id: ObjectId("demoteacher0"),
    comments: [],
    rating: 2,
    reviewCount: 3,
  },
  {
    _id: ObjectId("clase0000009"),

    title: "Python y Pandas",
    materia: {
      value: "python",
    },
    description:
      "Python es un lenguaje de alto nivel de programación interpretado cuya filosofía hace hincapié \
		en la legibilidad de su código, se utiliza para desarrollar aplicaciones de todo tipo, ejemplos: Instagram, Netflix \
		Spotify, Panda3D, entre otros.​",
    price: 1,
    duration: 1,
    nivel: {
      value: "seminario",
    },
    frecuencia: {
      value: "once",
    },
    tipo_clase: {
      value: "grupal",
    },
    tags: ["stats", "python", "pandas"],

    teacher_profile_id: ObjectId("demoteacher0"),
    comments: [],
    rating: 5,
    reviewCount: 25,
  },
  {
    _id: ObjectId("clase0000010"),

    title: "Golang y las go rutinas",
    materia: {
      value: "golang",
    },
    description:
      "Go es un lenguaje de programación concurrente y compilado con tipado estático inspirado \
		en la sintaxis de C, pero con seguridad de memoria y recolección de basura. Ha sido desarrollado por Google9​  \
		y sus diseñadores iniciales fueron Robert Griesemer, Rob Pike y Ken Thompson.10​ Actualmente está disponible en \
		formato binario para los sistemas operativos Windows, GNU/Linux, FreeBSD y Mac OS X, pudiendo también ser instalado\
		en estos y en otros sistemas mediante el código fuente.11​12​ Go es un lenguaje de programación compilado, \
		concurrente, imperativo, estructurado y orientado a objetos que de momento está disponible para diferentes tipos de\
		sistemas Unix-like, incluidos Linux, FreeBSD, Mac OS X y Plan 9 (puesto que parte del compilador está basado en un \
		trabajo previo sobre el sistema operativo Inferno). Las arquitecturas soportadas son i386, amd64 y ARM. ",
    price: 25,
    duration: 68,
    nivel: {
      value: "universitario",
    },
    frecuencia: {
      value: "semanal",
    },
    tipo_clase: {
      value: "individual",
    },
    tags: ["programacion", "go", "poo", "goroutines"],

    teacher_profile_id: ObjectId("demoteacher0"),
    comments: [],
    rating: 5,
    reviewCount: 500,
  },
  {
    _id: ObjectId("clase0000011"),

    title: "JavaScript",
    materia: {
      value: "javascript",
    },
    description:
      "JavaScript es un lenguaje de programación interpretado, dialecto del estándar ECMAScript. \
		Se define como orientado a objetos, ​ basado en prototipos, imperativo, débilmente tipado y dinámico.",
    price: 5,
    duration: 5,
    nivel: {
      value: "primaria",
    },
    frecuencia: {
      value: "diaria",
    },
    tipo_clase: {
      value: "grupal",
    },
    tags: ["programacion", "javascript", "poo"],

    teacher_profile_id: ObjectId("demoteacher0"),
    comments: [],
    rating: 1,
    reviewCount: 5,
  },
  {
    _id: ObjectId("clase0000012"),

    title: "JavaScript",
    materia: {
      value: "javascript",
    },
    description:
      "Programacion orientada a Objectos en Java. \
		Java es un lenguaje de programación y una plataforma informática que fue comercializada por primera vez \
		en 1995 por Sun Microsystems.​​.",
    price: 5,
    duration: 5,
    nivel: {
      value: "primaria",
    },
    frecuencia: {
      value: "diaria",
    },
    tipo_clase: {
      value: "grupal",
    },
    tags: ["programacion", "java", "poo"],

    teacher_profile_id: ObjectId("demoteacher0"),
    comments: [],
    rating: 0,
    reviewCount: 0,
  },
  {
    _id: ObjectId("clase0000013"),

    title: "JavaScript",
    materia: {
      value: "javascript",
    },
    description:
      "Programacion orientada a Objectos en Java. \
		Java es un lenguaje de programación y una plataforma informática que fue comercializada por primera vez \
		en 1995 por Sun Microsystems.​​.",
    price: 5,
    duration: 5,
    nivel: {
      value: "primaria",
    },
    frecuencia: {
      value: "diaria",
    },
    tipo_clase: {
      value: "grupal",
    },
    tags: ["programacion", "java", "poo"],

    teacher_profile_id: ObjectId("demoteacher0"),
    comments: [],
    rating: 1,
    reviewCount: 25,
  },
  {
    _id: ObjectId("clase0000014"),

    title: "JavaScript",
    materia: {
      value: "javascript",
    },
    description:
      "Programacion orientada a Objectos en Java. \
		Java es un lenguaje de programación y una plataforma informática que fue comercializada por primera vez \
		en 1995 por Sun Microsystems.​​.",
    price: 5,
    duration: 5,
    nivel: {
      value: "primaria",
    },
    frecuencia: {
      value: "diaria",
    },
    tipo_clase: {
      value: "grupal",
    },
    tags: ["programacion", "java", "poo"],

    teacher_profile_id: ObjectId("demoteacher0"),
    comments: [],
    rating: 2,
    reviewCount: 15,
  },

  {
    _id: ObjectId("clase0000015"),

    title: "JavaScript",
    materia: {
      value: "javascript",
    },
    description:
      "Programacion orientada a Objectos en Java. \
		Java es un lenguaje de programación y una plataforma informática que fue comercializada por primera vez \
		en 1995 por Sun Microsystems.​​.",
    price: 5,
    duration: 5,
    nivel: {
      value: "primaria",
    },
    frecuencia: {
      value: "diaria",
    },
    tipo_clase: {
      value: "grupal",
    },
    tags: ["programacion", "java", "poo"],

    teacher_profile_id: ObjectId("demoteacher0"),
    comments: [],
    rating: 3,
    reviewCount: 5,
  },
]);



db.profiles.insertOne({
  _id: ObjectId("demostudent0"),
  firstName: "Armando",
  lastName: "Barreda",
  clases: [
    ObjectId("clase0000001"),
    ObjectId("clase0000002"),
    ObjectId("clase0000003"),
    ObjectId("clase0000004"),
    ObjectId("clase0000005"),
    ObjectId("clase0000006"),
  ],
  role: "student",
  fecha_nacimiento: "19/11/2022",
  experiencias: [
    {
      nivel: "primaria",
      completed: true,
    },
    {
      nivel: "secundaria",
      completed: true,
    },
    {
      nivel: "terciario",
      completed: true,
    },
    {
      nivel: "universitario",
      completed: false,
    },
  ],
  photo: "https://res.cloudinary.com/dvjdc3ssy/image/upload/v1668894850/rjhj017czkwubzqiw9uu.png",
});

db.users.insertOne({
  _id: ObjectId("demostudent0"),
  profile: ObjectId("demostudent0"),
  firstName: "Armando",
  lastName: "Barreda",
  email: "student@uade.edu.ar",
  password: "$2b$06$T8qZKC8v28SC2SfcVRWLgOgaEwwDy.DXlI2BbnOjpLTm9ApOE67Ru",
});


db.contratacions.insertOne({
  profile_id: ObjectId("demostudent0"),
  clase_id: ObjectId("clase0000001"),
  state: "solicitada",
  reason: "hola me gustaria tomar clases particulares, sabes de los temas del CBC?"
});

db.contratacions.insertOne({
  profile_id: ObjectId("demostudent0"),
  clase_id: ObjectId("clase0000002"),
  state: "cancelada",
  reason: "hola me gustaria tomar clases particulares, sabes de los temas del CBC?"
});

db.contratacions.insertOne({
  profile_id: ObjectId("demostudent0"),
  clase_id: ObjectId("clase0000003"),
  state: "finalizada",
  reason: "hola me gustaria tomar clases particulares, sabes de los temas del CBC?"
});

db.contratacions.insertOne({
  profile_id: ObjectId("demostudent0"),
  clase_id: ObjectId("clase0000004"),
  state: "aceptada",
  reason: "hola me gustaria tomar clases particulares, sabes de los temas del CBC?"
});

db.contratacions.insertOne({
  profile_id: ObjectId("demostudent0"),
  clase_id: ObjectId("clase0000005"),
  state: "solicitada",
  reason: "hola me gustaria tomar clases particulares, sabes de los temas del CBC?"
});

db.contratacions.insertOne({
  profile_id: ObjectId("demostudent0"),
  clase_id: ObjectId("clase0000006"),
  state: "aceptada",
  reason: "hola me gustaria tomar clases particulares, sabes de los temas del CBC?"
});

