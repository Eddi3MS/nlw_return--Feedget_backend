import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "teste unitario",
        screenshot: "data:image/png;base64... ", // => passa no teste
        //screenshot: "teste.jpg", // =================> da erro no teste
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should be able to submit only screenshot with base64 formats", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "teste unitario",
        screenshot: "teste.jpg", // =================> da erro no teste
      })
    ).rejects.toThrow();
  });

  it("shouldnt be able to submit without a type", async () => {
    await expect(
      submitFeedback.execute({
        type: "", // =================> da erro no teste
        comment: "teste unitario",
        screenshot: "data:image/png;base64... ",
      })
    ).rejects.toThrow();
  });

  it("shouldnt be able to submit without a comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "", // =================> da erro no teste
        screenshot: "data:image/png;base64... ",
      })
    ).rejects.toThrow();
  });
});
