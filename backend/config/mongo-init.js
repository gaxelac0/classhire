let hunder = 100;
let cantPos = 2;
let cantNeg = 1;
let varReviewCount = 3;
let point = (100 * cantPos) / varReviewCount / 20;

const crypto = require("crypto");

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
    ObjectId("clase0000007"),
    ObjectId("clase0000008"),
    ObjectId("clase0000009"),
    ObjectId("clase0000010"),
    ObjectId("clase0000011"),
    ObjectId("clase0000012"),
    ObjectId("clase0000013"),
    ObjectId("clase0000014"),
    ObjectId("clase0000015"),
    ObjectId("clase0000016"),
  ],
  role: "teacher",
  titulo: "Ingeniero en Informatica",
  fecha_nacimiento: "14/01/1964",
  description:
    "Joe Fathree es un author ganador de diversos premios al merito educativo, incluyendo ser nombrado como uno de los mejores profesores del mundo en 2016",
  experiencias: [
    {
      nivel: "primaria",
      descr: "Profesor de programacion",
    },
    {
      nivel: "secundaria",
      descr: "Profesor de programacion",
    },
    {
      nivel: "universitario",
      descr: "Profesor de Programacion III",
    },
    {
      nivel: "seminario",
      descr: "Charlas de programacion",
    },
  ],
  photo:
    "http://res.cloudinary.com/dvjdc3ssy/image/upload/v1668944647/jej6zfcgvfjqikxrdaxt.png",
});

db.users.insertOne({
  _id: ObjectId("demoteacher0"),
  profile: ObjectId("demoteacher0"),
  firstName: "Joe",
  lastName: "Fateree",
  email: "teacher@uade.edu.ar",
  password: "$2b$06$T8qZKC8v28SC2SfcVRWLgOgaEwwDy.DXlI2BbnOjpLTm9ApOE67Ru",
});
db.clases.createIndex({ updateAt: -1 });
db.clases.insertMany([
  {
    _id: ObjectId("clase0000001"),

    title: "Ruby",
    state: "publicada",
    materia: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "ruby",
    },
    description:
      "Ruby es un lenguaje de programación interpretado, reflexivo y orientado a objetos, \
		 creado por el programador japonés Yukihiro Matz Matsumoto, quien comenzó a trabajar en Ruby en 1993, \
		 y lo presentó públicamente en 1995. ",
    price: 10,
    duration: 4,
    nivel: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "seminario",
    },
    frecuencia: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "once",
    },
    tipo_clase: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "grupal",
    },
    tags: ["ruby", "ruby on rails", "poo"],
    teacher_profile_id: ObjectId("demoteacher0"),
    comments: [
      {
        type: "positive",
        comment: "muy buena la clase",
        profile_author_id: "64656d6f73747564656e7430",
        state: "aceptada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:10.128Z",
        updatedAt: "2022-11-21T15:32:10.128Z",
      },
      {
        type: "negative",
        comment: "se dicto sin ganas",
        profile_author_id: "64656d6f73747564656e7430",
        state: "enviada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:14.539Z",
        updatedAt: "2022-11-21T15:32:14.539Z",
      },
      {
        type: "negative",
        comment: "me quedaron cortas las clases",
        profile_author_id: "64656d6f73747564656e7430",
        state: "aceptada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:14.539Z",
        updatedAt: "2022-11-21T15:32:14.539Z",
      },
    ],
    rating: point,
    reviewCount: varReviewCount,
    reviewNegative: cantNeg,
    reviewPositive: cantPos,
    timestamp: new Date().valueOf(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("clase0000002"),

    title: "Java",
    state: "publicada",
    materia: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "java",
    },
    description:
      "Programacion orientada a Objectos en Java. \
		Java es un lenguaje de programación y una plataforma informática que fue comercializada por primera vez \
		en 1995 por Sun Microsystems.​​.",
    price: 5,
    duration: 5,
    nivel: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "universitario",
    },
    frecuencia: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "diaria",
    },
    tipo_clase: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "grupal",
    },
    tags: ["programacion", "java", "poo"],

    teacher_profile_id: ObjectId("demoteacher0"),
    comments: [
      {
        type: "positive",
        comment: "muy buena la clase",
        profile_author_id: "64656d6f73747564656e7430",
        state: "aceptada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:10.128Z",
        updatedAt: "2022-11-21T15:32:10.128Z",
      },
      {
        type: "negative",
        comment: "se dicto sin ganas",
        profile_author_id: "64656d6f73747564656e7430",
        state: "enviada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:14.539Z",
        updatedAt: "2022-11-21T15:32:14.539Z",
      },
      {
        type: "negative",
        comment: "me quedaron cortas las clases",
        profile_author_id: "64656d6f73747564656e7430",
        state: "aceptada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:14.539Z",
        updatedAt: "2022-11-21T15:32:14.539Z",
      },
    ],
    rating: point,
    reviewCount: varReviewCount,
    reviewNegative: cantNeg,
    reviewPositive: cantPos,
    timestamp: new Date().valueOf(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("clase0000003"),

    title: "Golang",
    state: "publicada",
    materia: {
      _id: crypto.randomBytes(12).toString("hex"),
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
      _id: crypto.randomBytes(12).toString("hex"),
      value: "secundaria",
    },
    frecuencia: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "semanal",
    },
    tipo_clase: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "individual",
    },
    tags: ["programacion", "java", "poo"],

    teacher_profile_id: ObjectId("demoteacher0"),
    comments: [
      {
        type: "positive",
        comment: "muy buena la clase",
        profile_author_id: "64656d6f73747564656e7430",
        state: "aceptada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:10.128Z",
        updatedAt: "2022-11-21T15:32:10.128Z",
      },
      {
        type: "negative",
        comment: "se dicto sin ganas",
        profile_author_id: "64656d6f73747564656e7430",
        state: "enviada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:14.539Z",
        updatedAt: "2022-11-21T15:32:14.539Z",
      },
      {
        type: "negative",
        comment: "me quedaron cortas las clases",
        profile_author_id: "64656d6f73747564656e7430",
        state: "aceptada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:14.539Z",
        updatedAt: "2022-11-21T15:32:14.539Z",
      },
    ],
    rating: point,
    reviewCount: varReviewCount,
    reviewNegative: cantNeg,
    reviewPositive: cantPos,
    timestamp: new Date().valueOf(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("clase0000004"),

    title: "C++",
    state: "publicada",
    materia: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "cplusplus",
    },
    description:
      "Programacion orientada a Objectos en Java. \
		Java es un lenguaje de programación y una plataforma informática que fue comercializada por primera vez \
		en 1995 por Sun Microsystems.​​.",
    price: 5,
    duration: 5,
    nivel: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "universitario",
    },
    frecuencia: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "once",
    },
    tipo_clase: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "consulta",
    },
    tags: ["programacion", "java", "poo"],

    teacher_profile_id: ObjectId("demoteacher0"),
    comments: [
      {
        type: "positive",
        comment: "muy buena la clase",
        profile_author_id: "64656d6f73747564656e7430",
        state: "aceptada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:10.128Z",
        updatedAt: "2022-11-21T15:32:10.128Z",
      },
      {
        type: "negative",
        comment: "se dicto sin ganas",
        profile_author_id: "64656d6f73747564656e7430",
        state: "enviada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:14.539Z",
        updatedAt: "2022-11-21T15:32:14.539Z",
      },
      {
        type: "negative",
        comment: "me quedaron cortas las clases",
        profile_author_id: "64656d6f73747564656e7430",
        state: "aceptada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:14.539Z",
        updatedAt: "2022-11-21T15:32:14.539Z",
      },
    ],
    rating: point,
    reviewCount: varReviewCount,
    reviewNegative: cantNeg,
    reviewPositive: cantPos,
    timestamp: new Date().valueOf(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("clase0000005"),

    title: "Python",
    state: "publicada",
    materia: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "python",
    },
    description:
      "Programacion orientada a Objectos en Java. \
		Java es un lenguaje de programación y una plataforma informática que fue comercializada por primera vez \
		en 1995 por Sun Microsystems.​​.",
    price: 5,
    duration: 5,
    nivel: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "secundaria",
    },
    frecuencia: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "diaria",
    },
    tipo_clase: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "individual",
    },
    tags: ["programacion", "java", "poo"],

    teacher_profile_id: ObjectId("demoteacher0"),
    comments: [
      {
        type: "positive",
        comment: "muy buena la clase",
        profile_author_id: "64656d6f73747564656e7430",
        state: "aceptada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:10.128Z",
        updatedAt: "2022-11-21T15:32:10.128Z",
      },
      {
        type: "negative",
        comment: "se dicto sin ganas",
        profile_author_id: "64656d6f73747564656e7430",
        state: "enviada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:14.539Z",
        updatedAt: "2022-11-21T15:32:14.539Z",
      },
      {
        type: "negative",
        comment: "me quedaron cortas las clases",
        profile_author_id: "64656d6f73747564656e7430",
        state: "aceptada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:14.539Z",
        updatedAt: "2022-11-21T15:32:14.539Z",
      },
    ],
    rating: point,
    reviewCount: varReviewCount,
    reviewNegative: cantNeg,
    reviewPositive: cantPos,
    timestamp: new Date().valueOf(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("clase0000006"),

    title: "JavaScript 1",
    state: "publicada",
    materia: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "javascript",
    },
    description:
      "Programacion orientada a Objectos en Java. \
		Java es un lenguaje de programación y una plataforma informática que fue comercializada por primera vez \
		en 1995 por Sun Microsystems.​​.",
    price: 5,
    duration: 5,
    nivel: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "primaria",
    },
    frecuencia: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "diaria",
    },
    tipo_clase: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "grupal",
    },
    tags: ["programacion", "java", "poo"],

    teacher_profile_id: ObjectId("demoteacher0"),
    comments: [
      {
        type: "positive",
        comment: "muy buena la clase",
        profile_author_id: "64656d6f73747564656e7430",
        state: "aceptada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:10.128Z",
        updatedAt: "2022-11-21T15:32:10.128Z",
      },
      {
        type: "negative",
        comment: "se dicto sin ganas",
        profile_author_id: "64656d6f73747564656e7430",
        state: "enviada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:14.539Z",
        updatedAt: "2022-11-21T15:32:14.539Z",
      },
      {
        type: "negative",
        comment: "me quedaron cortas las clases",
        profile_author_id: "64656d6f73747564656e7430",
        state: "aceptada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:14.539Z",
        updatedAt: "2022-11-21T15:32:14.539Z",
      },
    ],
    rating: point,
    reviewCount: varReviewCount,
    reviewNegative: cantNeg,
    reviewPositive: cantPos,
    timestamp: new Date().valueOf(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("clase0000007"),

    title: "Ruby On Rails",
    state: "publicada",
    materia: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "ruby",
    },
    description: "Ruby",
    price: 2,
    duration: 1,
    nivel: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "universitario",
    },
    frecuencia: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "semanal",
    },
    tipo_clase: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "grupal",
    },
    tags: ["programacion", "ruby", "poo"],

    teacher_profile_id: ObjectId("demoteacher0"),
    comments: [
      {
        type: "positive",
        comment: "muy buena la clase",
        profile_author_id: "64656d6f73747564656e7430",
        state: "aceptada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:10.128Z",
        updatedAt: "2022-11-21T15:32:10.128Z",
      },
      {
        type: "negative",
        comment: "se dicto sin ganas",
        profile_author_id: "64656d6f73747564656e7430",
        state: "enviada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:14.539Z",
        updatedAt: "2022-11-21T15:32:14.539Z",
      },
      {
        type: "negative",
        comment: "me quedaron cortas las clases",
        profile_author_id: "64656d6f73747564656e7430",
        state: "aceptada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:14.539Z",
        updatedAt: "2022-11-21T15:32:14.539Z",
      },
    ],
    rating: point,
    reviewCount: varReviewCount,
    reviewNegative: cantNeg,
    reviewPositive: cantPos,
    timestamp: new Date().valueOf(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("clase0000008"),

    title: "JavaScript 2",
    state: "publicada",
    materia: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "javascript",
    },
    description:
      "C++ es un lenguaje de programación diseñado en 1979 por Bjarne Stroustrup. \
		La intención de su creación fue extender al lenguaje de programación C y añadir mecanismos que permiten la 		 manipulación de objetos. En ese sentido, desde el punto de vista de los lenguajes orientados a objetos, C++ es un  lenguaje híbrido. ",
    price: 15,
    duration: 68,
    nivel: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "universitario",
    },
    frecuencia: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "semanal",
    },
    tipo_clase: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "individual",
    },
    tags: ["programacion", "java", "poo"],

    teacher_profile_id: ObjectId("demoteacher0"),
    comments: [
      {
        type: "positive",
        comment: "muy buena la clase",
        profile_author_id: "64656d6f73747564656e7430",
        state: "aceptada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:10.128Z",
        updatedAt: "2022-11-21T15:32:10.128Z",
      },
      {
        type: "negative",
        comment: "se dicto sin ganas",
        profile_author_id: "64656d6f73747564656e7430",
        state: "enviada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:14.539Z",
        updatedAt: "2022-11-21T15:32:14.539Z",
      },
      {
        type: "negative",
        comment: "me quedaron cortas las clases",
        profile_author_id: "64656d6f73747564656e7430",
        state: "aceptada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:14.539Z",
        updatedAt: "2022-11-21T15:32:14.539Z",
      },
    ],
    rating: point,
    reviewCount: varReviewCount,
    reviewNegative: cantNeg,
    reviewPositive: cantPos,
    timestamp: new Date().valueOf(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("clase0000009"),

    title: "Python y Pandas",
    state: "publicada",
    materia: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "python",
    },
    description:
      "Python es un lenguaje de alto nivel de programación interpretado cuya filosofía hace hincapié \
		en la legibilidad de su código, se utiliza para desarrollar aplicaciones de todo tipo, ejemplos: Instagram, Netflix \
		Spotify, Panda3D, entre otros.​",
    price: 1,
    duration: 1,
    nivel: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "seminario",
    },
    frecuencia: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "once",
    },
    tipo_clase: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "grupal",
    },
    tags: ["stats", "python", "pandas"],

    teacher_profile_id: ObjectId("demoteacher0"),
    comments: [
      {
        type: "positive",
        comment: "muy buena la clase",
        profile_author_id: "64656d6f73747564656e7430",
        state: "aceptada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:10.128Z",
        updatedAt: "2022-11-21T15:32:10.128Z",
      },
      {
        type: "negative",
        comment: "se dicto sin ganas",
        profile_author_id: "64656d6f73747564656e7430",
        state: "enviada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:14.539Z",
        updatedAt: "2022-11-21T15:32:14.539Z",
      },
      {
        type: "negative",
        comment: "me quedaron cortas las clases",
        profile_author_id: "64656d6f73747564656e7430",
        state: "aceptada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:14.539Z",
        updatedAt: "2022-11-21T15:32:14.539Z",
      },
      {
        type: "positive",
        comment: "muy buena la clase",
        profile_author_id: "64656d6f73747564656e7430",
        state: "aceptada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:10.128Z",
        updatedAt: "2022-11-21T15:32:10.128Z",
      },
    ],
    rating: point,
    reviewCount: varReviewCount,
    reviewNegative: cantNeg,
    reviewPositive: cantPos,
    timestamp: new Date().valueOf(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("clase0000010"),

    title: "Golang y las go rutinas",
    state: "publicada",
    materia: {
      _id: crypto.randomBytes(12).toString("hex"),
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
      _id: crypto.randomBytes(12).toString("hex"),
      value: "universitario",
    },
    frecuencia: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "semanal",
    },
    tipo_clase: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "individual",
    },
    tags: ["programacion", "go", "poo", "goroutines"],

    teacher_profile_id: ObjectId("demoteacher0"),
    comments: [
      {
        type: "positive",
        comment: "muy buena la clase",
        profile_author_id: "64656d6f73747564656e7430",
        state: "aceptada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:10.128Z",
        updatedAt: "2022-11-21T15:32:10.128Z",
      },
      {
        type: "negative",
        comment: "se dicto sin ganas",
        profile_author_id: "64656d6f73747564656e7430",
        state: "enviada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:14.539Z",
        updatedAt: "2022-11-21T15:32:14.539Z",
      },
      {
        type: "negative",
        comment: "me quedaron cortas las clases",
        profile_author_id: "64656d6f73747564656e7430",
        state: "aceptada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:14.539Z",
        updatedAt: "2022-11-21T15:32:14.539Z",
      },
    ],
    rating: point,
    reviewCount: varReviewCount,
    reviewNegative: cantNeg,
    reviewPositive: cantPos,
    timestamp: new Date().valueOf(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("clase0000011"),

    title: "JavaScript 3",
    state: "publicada",
    materia: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "javascript",
    },
    description:
      "JavaScript es un lenguaje de programación interpretado, dialecto del estándar ECMAScript. \
		Se define como orientado a objetos, ​ basado en prototipos, imperativo, débilmente tipado y dinámico.",
    price: 5,
    duration: 5,
    nivel: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "primaria",
    },
    frecuencia: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "diaria",
    },
    tipo_clase: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "grupal",
    },
    tags: ["programacion", "javascript", "poo"],

    teacher_profile_id: ObjectId("demoteacher0"),
    comments: [
      {
        type: "positive",
        comment: "muy buena la clase",
        profile_author_id: "64656d6f73747564656e7430",
        state: "aceptada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:10.128Z",
        updatedAt: "2022-11-21T15:32:10.128Z",
      },
      {
        type: "negative",
        comment: "se dicto sin ganas",
        profile_author_id: "64656d6f73747564656e7430",
        state: "enviada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:14.539Z",
        updatedAt: "2022-11-21T15:32:14.539Z",
      },
      {
        type: "negative",
        comment: "me quedaron cortas las clases",
        profile_author_id: "64656d6f73747564656e7430",
        state: "aceptada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:14.539Z",
        updatedAt: "2022-11-21T15:32:14.539Z",
      },
    ],
    rating: point,
    reviewCount: varReviewCount,
    reviewNegative: cantNeg,
    reviewPositive: cantPos,
    timestamp: new Date().valueOf(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("clase0000012"),

    title: "JavaScript 4",
    state: "publicada",
    materia: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "javascript",
    },
    description:
      "Programacion orientada a Objectos en Java. \
		Java es un lenguaje de programación y una plataforma informática que fue comercializada por primera vez \
		en 1995 por Sun Microsystems.​​.",
    price: 5,
    duration: 5,
    nivel: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "primaria",
    },
    frecuencia: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "diaria",
    },
    tipo_clase: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "grupal",
    },
    tags: ["programacion", "java", "poo"],

    teacher_profile_id: ObjectId("demoteacher0"),
    comments: [
      {
        type: "positive",
        comment: "muy buena la clase",
        profile_author_id: "64656d6f73747564656e7430",
        state: "aceptada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:10.128Z",
        updatedAt: "2022-11-21T15:32:10.128Z",
      },
      {
        type: "negative",
        comment: "se dicto sin ganas",
        profile_author_id: "64656d6f73747564656e7430",
        state: "enviada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:14.539Z",
        updatedAt: "2022-11-21T15:32:14.539Z",
      },
      {
        type: "negative",
        comment: "me quedaron cortas las clases",
        profile_author_id: "64656d6f73747564656e7430",
        state: "aceptada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:14.539Z",
        updatedAt: "2022-11-21T15:32:14.539Z",
      },
    ],
    rating: point,
    reviewCount: varReviewCount,
    reviewNegative: cantNeg,
    reviewPositive: cantPos,
    timestamp: new Date().valueOf(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("clase0000013"),

    title: "JavaScript 5",
    state: "publicada",
    materia: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "javascript",
    },
    description:
      "Programacion orientada a Objectos en Java. \
		Java es un lenguaje de programación y una plataforma informática que fue comercializada por primera vez \
		en 1995 por Sun Microsystems.​​.",
    price: 5,
    duration: 5,
    nivel: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "primaria",
    },
    frecuencia: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "diaria",
    },
    tipo_clase: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "grupal",
    },
    tags: ["programacion", "java", "poo"],

    teacher_profile_id: ObjectId("demoteacher0"),
    comments: [
      {
        type: "positive",
        comment: "muy buena la clase",
        profile_author_id: "64656d6f73747564656e7430",
        state: "aceptada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:10.128Z",
        updatedAt: "2022-11-21T15:32:10.128Z",
      },
      {
        type: "negative",
        comment: "se dicto sin ganas",
        profile_author_id: "64656d6f73747564656e7430",
        state: "enviada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:14.539Z",
        updatedAt: "2022-11-21T15:32:14.539Z",
      },
      {
        type: "negative",
        comment: "me quedaron cortas las clases",
        profile_author_id: "64656d6f73747564656e7430",
        state: "aceptada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:14.539Z",
        updatedAt: "2022-11-21T15:32:14.539Z",
      },
    ],
    rating: point,
    reviewCount: varReviewCount,
    reviewNegative: cantNeg,
    reviewPositive: cantPos,
    timestamp: new Date().valueOf(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("clase0000014"),

    title: "JavaScript 6",
    state: "publicada",
    materia: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "javascript",
    },
    description:
      "Programacion orientada a Objectos en Java. \
		Java es un lenguaje de programación y una plataforma informática que fue comercializada por primera vez \
		en 1995 por Sun Microsystems.​​.",
    price: 5,
    duration: 5,
    nivel: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "primaria",
    },
    frecuencia: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "diaria",
    },
    tipo_clase: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "grupal",
    },
    tags: ["programacion", "java", "poo"],

    teacher_profile_id: ObjectId("demoteacher0"),
    comments: [
      {
        type: "positive",
        comment: "muy buena la clase",
        profile_author_id: "64656d6f73747564656e7430",
        state: "aceptada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:10.128Z",
        updatedAt: "2022-11-21T15:32:10.128Z",
      },
      {
        type: "negative",
        comment: "se dicto sin ganas",
        profile_author_id: "64656d6f73747564656e7430",
        state: "enviada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:14.539Z",
        updatedAt: "2022-11-21T15:32:14.539Z",
      },
      {
        type: "negative",
        comment: "me quedaron cortas las clases",
        profile_author_id: "64656d6f73747564656e7430",
        state: "aceptada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:14.539Z",
        updatedAt: "2022-11-21T15:32:14.539Z",
      },
    ],
    rating: point,
    reviewCount: varReviewCount,
    reviewNegative: cantNeg,
    reviewPositive: cantPos,
    timestamp: new Date().valueOf(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    _id: ObjectId("clase0000015"),

    title: "JavaScript 7",
    state: "publicada",
    materia: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "javascript",
    },
    description:
      "Programacion orientada a Objectos en Java. \
		Java es un lenguaje de programación y una plataforma informática que fue comercializada por primera vez \
		en 1995 por Sun Microsystems.​​.",
    price: 5,
    duration: 5,
    nivel: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "primaria",
    },
    frecuencia: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "diaria",
    },
    tipo_clase: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "grupal",
    },
    tags: ["programacion", "java", "poo"],
    teacher_profile_id: ObjectId("demoteacher0"),
    comments: [
      {
        type: "positive",
        comment: "muy buena la clase",
        profile_author_id: "64656d6f73747564656e7430",
        state: "aceptada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:10.128Z",
        updatedAt: "2022-11-21T15:32:10.128Z",
      },
      {
        type: "negative",
        comment: "se dicto sin ganas",
        profile_author_id: "64656d6f73747564656e7430",
        state: "enviada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:14.539Z",
        updatedAt: "2022-11-21T15:32:14.539Z",
      },
      {
        type: "negative",
        comment: "me quedaron cortas las clases",
        profile_author_id: "64656d6f73747564656e7430",
        state: "aceptada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:14.539Z",
        updatedAt: "2022-11-21T15:32:14.539Z",
      },
    ],
    rating: point,
    reviewCount: varReviewCount,
    reviewNegative: cantNeg,
    reviewPositive: cantPos,
    timestamp: new Date().valueOf(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("clase0000016"),

    title: "Ruby 2021",
    state: "despublicada",
    materia: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "ruby",
    },
    description:
      "Despublicada - Ruby es un lenguaje de programación interpretado, reflexivo y orientado a objetos, \
		 creado por el programador japonés Yukihiro Matz Matsumoto, quien comenzó a trabajar en Ruby en 1993, \
		 y lo presentó públicamente en 1995. ",
    price: 10,
    duration: 4,
    nivel: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "seminario",
    },
    frecuencia: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "once",
    },
    tipo_clase: {
      _id: crypto.randomBytes(12).toString("hex"),
      value: "grupal",
    },
    tags: ["ruby", "ruby on rails", "poo"],

    teacher_profile_id: ObjectId("demoteacher0"),
    comments: [
      {
        type: "positive",
        comment: "muy buena la clase",
        profile_author_id: "64656d6f73747564656e7430",
        state: "aceptada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:10.128Z",
        updatedAt: "2022-11-21T15:32:10.128Z",
      },
      {
        type: "negative",
        comment: "se dicto sin ganas",
        profile_author_id: "64656d6f73747564656e7430",
        state: "enviada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:14.539Z",
        updatedAt: "2022-11-21T15:32:14.539Z",
      },
      {
        type: "negative",
        comment: "me quedaron cortas las clases",
        profile_author_id: "64656d6f73747564656e7430",
        state: "aceptada",
        _id: crypto.randomBytes(12).toString("hex"),
        createdAt: "2022-11-21T15:32:14.539Z",
        updatedAt: "2022-11-21T15:32:14.539Z",
      },
    ],
    rating: point,
    reviewCount: varReviewCount,
    reviewNegative: cantNeg,
    reviewPositive: cantPos,
    timestamp: new Date().valueOf(),
    createdAt: new Date(),
    updatedAt: new Date(),
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
  photo:
    "https://res.cloudinary.com/dvjdc3ssy/image/upload/v1668894850/rjhj017czkwubzqiw9uu.png",
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
  name: "Armando Barreda",
  state_in_order: ["solicitada"],
  reasons_in_order: [
    "hola me gustaria tomar clases particulares, sabes de los temas del CBC?",
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
});

db.contratacions.insertOne({
  profile_id: ObjectId("demostudent0"),
  clase_id: ObjectId("clase0000002"),
  name: "Armando Barreda",
  state_in_order: ["solicitada", "cancelada"],
  reasons_in_order: [
    "hola me gustaria tomar clases particulares, sabes de los temas del CBC?",
    "no doy para CBC",
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
});

db.contratacions.insertOne({
  profile_id: ObjectId("demostudent0"),
  clase_id: ObjectId("clase0000003"),
  name: "Armando Barreda",
  state_in_order: ["solicitada", "aceptada", "finalizada"],
  reasons_in_order: [
    "hola me gustaria tomar clases particulares, sabes de los temas del CBC?",
    "bienvenido a las clases...",
    "todo bien",
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
});

db.contratacions.insertOne({
  profile_id: ObjectId("demostudent0"),
  clase_id: ObjectId("clase0000004"),
  name: "Armando Barreda",
  state_in_order: ["solicitada", "aceptada"],
  reasons_in_order: [
    "hola me gustaria tomar clases particulares, sabes de los temas del CBC?",
    "bienvenido a las clases...",
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
});

db.contratacions.insertOne({
  profile_id: ObjectId("demostudent0"),
  clase_id: ObjectId("clase0000005"),
  name: "Armando Barreda",
  state_in_order: ["solicitada"],
  reasons_in_order: [
    "hola me gustaria tomar clases particulares, sabes de los temas del CBC?",
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
});

db.contratacions.insertOne({
  profile_id: ObjectId("demostudent0"),
  clase_id: ObjectId("clase0000006"),
  name: "Armando Barreda",
  state_in_order: ["solicitada", "aceptada"],
  reasons_in_order: [
    "hola me gustaria tomar clases particulares, sabes de los temas del CBC?",
    "bienvenido a las clases...",
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
});
