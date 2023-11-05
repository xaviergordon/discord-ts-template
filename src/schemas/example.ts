import { Schema, SchemaTypes, model } from 'mongoose';
import { Example } from '../interfaces/example';

const schema = new Schema<Example>({
	exampleID: { type: SchemaTypes.String, required: true },
});

const modal = model<Example>('example', schema);

export async function getExample(id: string) {
	return await modal.findOne({ exampleID: id });
}
