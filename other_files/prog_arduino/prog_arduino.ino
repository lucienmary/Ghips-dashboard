String testWord;
unsigned long time_start; // envoi PS toute les 5 sec.
enum { ATTENTE, EN_COURS } etat = ATTENTE; // envoi PS toute les 5 sec.

String sendText = "Oui ou non!";

void setup() {
  Serial.begin(9600);

   pinMode(8, OUTPUT);
}

void loop() {

  switch( etat ){ // envoi PS toute les 5 sec.
  case ATTENTE:
      // demarrage du comptage de 90 secondes
      time_start = millis();
      etat = EN_COURS;
    break;
  case EN_COURS:
    if ( (millis() - time_start) >= 5000 )
    {
      // fin des  90 secondes
      etat = ATTENTE;
      Serial.println(sendText);
    }
    break;
  }

  
  if(Serial.available()){
    
    testWord = Serial.readString();
    testWord.trim();
    if(testWord.substring(0) == "yellow-1"){
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
      Serial.println("La commande est illisible ou n'existe pas.");
    }

     digitalWrite(5, HIGH);
    delay(250);
    digitalWrite(5, LOW);
  }
}
