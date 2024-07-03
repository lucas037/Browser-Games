import { db } from "@/app/fireBaseConfig";
import { Party } from "@/app/types/PartyType";
import { Player } from "@/app/types/PlayerType";
import { collection, addDoc, query, where, getDocs, doc, getDoc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";

const partiesCollection = collection(db, "parties");

export function addPartyAcess(code: string): Promise<string> {
  return addDoc(partiesCollection, {
    joinCode: code,
    stage: "queue",
    players: []
  })
  .then((docRef) => {
    console.log("Documento adicionado com ID: ", docRef.id);
    return docRef.id;
  })
  .catch((error) => {
    console.error("Erro ao adicionar documento: ", error);
    throw error; // Lança o erro novamente para tratar na chamada de addPlayersAcess
  });
}

export function addPlayertoParty(code: string, player: Player): void {
  const partyDocRef = doc(partiesCollection, code);

  updateDoc(partyDocRef, {
    players: arrayUnion(player)
  })
}

export function updateParty(code: string, party: Party): void {
  const partyDocRef = doc(partiesCollection, code);

  alert("opa");
  setDoc(partyDocRef, party);
}

export async function getPartyIdByCode(code: string): Promise<string | null> {
  const q = query(partiesCollection, where("joinCode", "==", code));

  try {
    const querySnapshot = await getDocs(q);
    console.log("Query Snapshot:", querySnapshot.docs);

    if (querySnapshot.empty) {
      console.log("Nenhum documento correspondente encontrado.");
      return null;
    } else {
      // Assume-se aqui que há apenas um documento correspondente (ou o primeiro encontrado)
      return querySnapshot.docs[0].id;
    }
  } catch (error) {
    console.error("Erro ao buscar documentos: ", error);
    throw error;
  }
}

export async function getPartyById(id: string): Promise<Party | null> {
  const partyDocRef = doc(partiesCollection, id);

  try {
    const partyDoc = await getDoc(partyDocRef);
    console.log("Party Document:", partyDoc.data());

    if (!partyDoc.exists()) {
      console.log("Nenhum documento correspondente encontrado.");
      return null;
    } 
    
    else {
      const party: Party = {
        joinCode: partyDoc.data().joinCode,
        stage: partyDoc.data().stage,
        players: partyDoc.data().players
      };
      return party;
    }
  } catch (error) {
    console.error("Erro ao buscar documento: ", error);
    throw error;
  }
}