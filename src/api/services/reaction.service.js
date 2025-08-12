"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReaction = exports.readReaction = exports.createReaction = exports.fetchReactions = void 0;
const prisma_client_1 = __importDefault(require("../../prisma/prisma.client"));
const fetchReactions = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_client_1.default.reaction.findMany({
        include: { message: true }
    });
});
exports.fetchReactions = fetchReactions;
// ⬇️ UPDATED: include message relation (with senderId)
const createReaction = (reactionData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_client_1.default.reaction.create({
        data: reactionData,
        include: { message: true }
    });
});
exports.createReaction = createReaction;
// ⬇️ ADD readReaction (used in delete controller)
const readReaction = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_client_1.default.reaction.findUnique({
        where: { id },
        include: { message: true }
    });
});
exports.readReaction = readReaction;
const deleteReaction = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_client_1.default.reaction.delete({
        where: { id }
    });
});
exports.deleteReaction = deleteReaction;
