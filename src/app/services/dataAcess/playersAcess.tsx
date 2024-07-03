import { db } from "@/app/fireBaseConfig";
import { Player } from "@/app/types/PlayerType";
import { collection, addDoc, query, where, getDocs, doc, getDoc } from "firebase/firestore";

const playersCollection = collection(db, "players");

export function addPlayersAcess(player: Player): Promise<string> {
  return addDoc(playersCollection, {
    name: player.name,
    partyId: player.partyId,
    leader: player.leader,
    status: player.status,
    cards: player.cards
  })
  .then((docRef) => {
    console.log("Documento adicionado com ID: ", docRef.id);
    return docRef.id;
  })
  .catch((error) => {
    console.error("Erro ao adicionar documento: ", error);
    throw error;
  });
}


export async function getPlayerById(id: string): Promise<Player | null> {
  const docRef = doc(playersCollection, id);


  try {
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      console.log("Nenhum documento correspondente encontrado.");
      return null;
    } else {
      console.log(docSnapshot.data);
      const player: Player = {
        name: docSnapshot.data().name,
        leader: docSnapshot.data().leader,
        partyId: docSnapshot.data().partyId,
        status: docSnapshot.data().status,
        cards: docSnapshot.data().cards
      }


      return player;
    }
  } catch (error) {
    console.error("Erro ao buscar documento: ", error);
    throw error;
  }
}

export async function getPlayersByPartyCode(code: string): Promise<Player[] | null> {
  const q = query(playersCollection, where("partyId", "==", code));

  try {
    const querySnapshot = await getDocs(q);
    console.log("Query Snapshot:", querySnapshot.docs);

    if (querySnapshot.empty) {
      console.log("Nenhum documento correspondente encontrado.");
      return null;
    } else {
      const players: Player[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          name: data.name,
          leader: data.leader,
          partyId: data.partyId,
          status: data.status,
          cards: data.cards
        };
      }).reverse();
      
      return players;
    }
  } catch (error) {
    console.error("Erro ao buscar documentos: ", error);
    throw error;
  }
}