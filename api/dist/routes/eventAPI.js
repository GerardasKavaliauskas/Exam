"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const EventAPIController_1 = __importDefault(require("../controllers/EventAPIController"));
const router = express_1.default.Router();
// -- // -- // -- // -- //
router.get('/', EventAPIController_1.default.getAllEvents);
router.get('/:id', EventAPIController_1.default.getEvent);
router.get('users/:id', EventAPIController_1.default.getUserEvents);
router.post('/', EventAPIController_1.default.validateStore(), EventAPIController_1.default.storeEvent);
router.put('/:id', EventAPIController_1.default.validateUpdate(), EventAPIController_1.default.updateEvent);
router.delete('/:id', EventAPIController_1.default.deleteEvent);
exports.default = router;
