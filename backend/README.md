# Classhire back-end
Seeded by https://github.com/SEI-Remote/decoupled-mern-jwt-auth-template-back-end



# Database (MongoDB)
Root Account
admin
secret


# Endpoints

## /clase/add 
Genera una Clase. 

### Request Body
```
{
	title: "Analisis matematico 2 - Individual"
	description: ""

	"price": 5,
	"title": "gaxelac3@outlook.com",
	"description": "blabla",
	"frecuencia": [{ "value":"diaria" }, { "value":"unica" }]
	"tags": [{ "value":"analisis" }, { "value":"matematico" }, { "value":"individual" }]

}
```

## /clase/review 
Genera un comentario vinculado a una Clase y calcula la reviewCount en base a la cantidad de reviews y su tipo.

### Request Body
```
{
	type: "positiva/neutral/negativa"
	comment: "La clase estuvo muy buena/regular/mala"
}
```
El servicio recuperara la cantidad de reviews, la cantidad de positivas y negativas de la Clase.
Sumada a esta nueva, la cual esta definida segun el campo tipo
Calculara el porcentaje en base la sumatoria de ellas y sumada a esta nueva. 


### Response Body
```
{
	status: "ok/err",
	msg: "review agregado exitosamente/no pudo ser agregado"
}
```
