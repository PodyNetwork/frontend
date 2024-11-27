import React from 'react'
import footlink from "../../data/footlink.json";
import Link from "next/link";
import { useNavigate } from '@/components/utils/PageRouter';

const LegalLinks = () => {
  const { handleClick, isPending } = useNavigate();

  return (
    <div className="flex flex-col flex-wrap text-sm w-full">
    <p className="pb-5 font-bold">Legal</p>
    <ul className="flex flex-col" aria-label="Social Links">
      {footlink.legal.map((link, index) => (
        <button onClick={() => handleClick(link.url)} key={index}>
          <li
            className="hover:text-pody-primary flex gap-1 flex-row justify-between items-center hover:transition-all duration-100 font-medium border-t border-pody-secondary/40 p-3.5"
          >
            <p>{link.title}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 -960 960 960"
              fill="currentColor"
            >
              <path d="m553.85-253.85-42.16-43.38L664.46-450H180v-60h484.46L511.69-662.77l42.16-43.38L780-480 553.85-253.85Z" />
            </svg>
          </li>
        </button>
      ))}
    </ul>
  </div>
  )
}

export default LegalLinks