import prismaClient from "../../prisma";

class DeleteOcurrenceService {
  async execute(id) {
    id = Number(id);
    const deleteOcurrence = await prismaClient.occurrence.delete({
      where: {
        id: id,
      },
    });
    console.log("teste");

    return deleteOcurrence;
  }
}

export { DeleteOcurrenceService };
