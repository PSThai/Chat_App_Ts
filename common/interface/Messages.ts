import { MessageType } from "../enum/message-type";
import { ChaterType } from "../types/chat/chater.type";

export interface Messages {
     _id?: string;
     conversation: string;
     type: MessageType;
     files: any[];
     messages: string;
     sender: ChaterType;
     send_at?: Date;
     last_message?: string;
}
