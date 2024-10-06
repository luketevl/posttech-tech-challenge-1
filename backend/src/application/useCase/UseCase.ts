export default interface UseCase {
	execute (input: unknown): Promise<unknown>;
}