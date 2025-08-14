'use client';
/**
 * 목적: 표준 모달 래퍼(타이틀/닫기/바디). 콘텐츠는 외부에서 결정.
 */
import {
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalCloseButton, ModalBody,
} from '@chakra-ui/react';
import { ChartModalProps } from 'types/dashboard';
import { ChartContent } from './ChartContest';


export default function ChartModal({ isOpen, onClose, slug, title }: ChartModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ChartContent slug={slug} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
