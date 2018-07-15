# generic-firebase-api
Api generica para ser subida a firebase functions y realizar operaciones de datos sobre firestore

Para usar el proyecto requiere el uso de node
Adicnalmente se cenesita estar registrado en firebase y tener un proyecto

Se debe realizar los siguientes comandos:
* npm install
* firebase login
* firebase init
* firebase deploy

Esto descargara las dependencias, te identificara en firebase, iniciara el proyecto y lo desplegara en tu proyecto firebase

Al iniciar firebase es necesario marcar como minimo functions y firestore. Ademas debes escojer como lenguapje TypeScript

Una vez hecho, y si todo ha funcionado correctamente, dispondras de los siguientes endpoints

/entity/list
Petición: Post de tipo application/json
Ejemplo de llamada completa:
{
	"token" : "lJFtEYxdLF0x8rk2RdeJKLyo92Fr8ajo",
	"table" : "example",
	"filters" : [
        {
            'field' : 'date'
            'operation' : '>'
            'value' : '1531645944'
        }
    ]
	"orders" : [
        {
            'field' : 'date'
            'operation' : 'desc'
        }
	]
	"limit" : 10
}
Ejemplo de retorno completo:
[
{
	"id" : "asdkjKUhd837",
	"data" : {
		"campo_1" : "90",
		"date" : "1531425526",
		"campo_2" : "This is a example"
	}
},
{
	"id" : "asderK4hd837",
	"data" : {
		"campo_1" : "70",
		"date" : "1531425566",
		"campo_2" : "This is a example 2"
	}
}
]

/entity/add
Petición: Post de tipo application/json
Ejemplo de llamada completa:
{
	"token" : "lJFtEYxdLF0x8rk2RdeJKLyo92Fr8ajo",
	"table" : "example",
	"data" : {
		"campo_1" : "90",
		"date" : "1531425526",
		"campo_2" : "This is a example"
	}
}
Ejemplo de retorno completo:
{
	"id" : "asdkjKUhd837",
	"data" : {
		"campo_1" : "90",
		"date" : "1531425526",
		"campo_2" : "This is a example"
	}
}

/entity/edit
Petición: Post de tipo application/json
Ejemplo de llamada completa:
{
	"token" : "lJFtEYxdLF0x8rk2RdeJKLyo92Fr8ajo",
	"table" : "example",
	"id" : "asdkjKUhd837"
	"data" : {
		"campo_1" : "90",
		"date" : "1531425526",
		"campo_2" : "This is a example"
	}
}
Ejemplo de retorno completo:
{
	"id" : "asdkjKUhd837",
	"data" : {
		"campo_1" : "90",
		"date" : "1531425526",
		"campo_2" : "This is a example"
	}
}

/entity/view
Petición: Post de tipo application/json
Ejemplo de llamada completa:
{
	"token" : "lJFtEYxdLF0x8rk2RdeJKLyo92Fr8ajo",
	"table" : "example",
	"id" : "asdkjKUhd837"
}
Ejemplo de retorno completo:
{
	"id" : "asdkjKUhd837",
	"data" : {
		"campo_1" : "90",
		"date" : "1531425526",
		"campo_2" : "This is a example"
	}
}

/entity/delete
Petición: Post de tipo application/json
Ejemplo de llamada completa:
{
	"token" : "lJFtEYxdLF0x8rk2RdeJKLyo92Fr8ajo",
	"table" : "example",
	"id" : "asdkjKUhd837"
}
Ejemplo de retorno completo:
{
    "status": "ok"
}

Recomiendo usar timestamps paralas fechas
Los ids los genera firestore y son parecidos a un uuid corto

Las coleciones teneis que crearlas desde firestore, pero no su estructura, la cual se adaptara al primer add.
En table podeis poner cualquier coleccion que tengais