import { ethers } from 'ethers';
import CourseCompletionBadgeABI from './CourseCompletionBadgeABI.json';

const CONTRACT_ADDRESS = '0xCc5f08a508Ccb5Ea2971099b3FBd2eB29b17DacE'; // Replace with your contract address

export async function requestAccount() {
  await window.ethereum.request({ method: 'eth_requestAccounts' });
}

export async function getContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, CourseCompletionBadgeABI, signer);
}
