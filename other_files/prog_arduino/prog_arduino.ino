String testWord;
unsigned long time_start; // envoi PS toute les 5 sec.
enum { ATTENTE, EN_COURS } etat = ATTENTE; // envoi PS toute les X sec.
int timeBetweenSendPS = 10000;

// Temp & humidité (DHT11).
#include "DHT.h"
#define DHTPIN 13 // broche ou l'on a branche le capteur
// de-commenter le capteur utilise
#define DHTTYPE DHT11 // DHT 11
//#define DHTTYPE DHT22 // DHT 22 (AM2302)
//#define DHTTYPE DHT21 // DHT 21 (AM2301)
DHT dht(DHTPIN, DHTTYPE);//déclaration du capteur

void setup() {
   Serial.begin(9600);
   pinMode(8, OUTPUT);
   dht.begin();
}


void loop() {
  
  switch( etat ){ // envoi Port-serie toute les 5 sec.
  case ATTENTE:
      // demarrage du comptage de 90 secondes
      time_start = millis();
      etat = EN_COURS;
    break;
  case EN_COURS:
    if ( (millis() - time_start) >= timeBetweenSendPS ){
      // fin des  90 secondes
      etat = ATTENTE;

      // Les valeurs lues peuvent etre vieilles de jusqu'a 2 secondes (le capteur est lent)
      float h = dht.readHumidity();//on lit l'hygrometrie
      float t = dht.readTemperature();//on lit la temperature en celsius (par defaut)
      // pour lire en farenheit, il faut le paramère (isFahrenheit = true) :
 
      //On verifie si la lecture a echoue, si oui on quitte la boucle pour recommencer.
      if (isnan(h) || isnan(t)){
        Serial.println("Failed to read from DHT sensor!");
        return;
      }
      
      // Calcul de l'indice de temperature en Celsius
      float hic = dht.computeHeatIndex(t, h, false);
      Serial.println(String(h) +"-"+ String(t) +"-"+ String(hic) +"`");
    }
    break;
  }

  
  if(Serial.available()){
    
    testWord = Serial.readString();
    testWord.trim();
    
    if(testWord.substring(0) == "all-1"){
      digitalWrite(8, HIGH);
      digitalWrite(7, HIGH);
      digitalWrite(6, HIGH);
    }
    else if(testWord.substring(0) == "all-0"){
      digitalWrite(8, LOW);
      digitalWrite(7, LOW);
      digitalWrite(6, LOW);
    }
    else if(testWord.substring(0) == "yellow-1"){
      digitalWrite(8, HIGH);
    }
    else if(testWord.substring(0) == "yellow-0"){
      digitalWrite(8, LOW);
    }
    else if(testWord.substring(0) == "blue-1"){
      digitalWrite(7, HIGH);
    }
    else if(testWord.substring(0) == "blue-0"){
      digitalWrite(7, LOW);
    }
    else if(testWord.substring(0) == "green-1"){
      digitalWrite(6, HIGH);
    }
    else if(testWord.substring(0) == "green-0"){
      digitalWrite(6, LOW);
    }else{
      Serial.println("La commande est illisible ou n'existe pas.`");
    }

     digitalWrite(5, HIGH);
    delay(250);
    digitalWrite(5, LOW);
  }
  
}
